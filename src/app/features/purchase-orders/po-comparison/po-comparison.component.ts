import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

interface POItem {
  itemName: string;
  unitPrice: number;
  quantity: number;
  total: number;
  [key: string]: any;
}

interface SupplierData {
  supplier: string;
  items: POItem[];
  fileName: string;
  totalAmount: number;
}

interface ComparisonItem {
  itemName: string;
  suppliers: {
    [supplierName: string]: {
      unitPrice: number;
      quantity: number;
      total: number;
    };
  };
  lowestPrice: number;
  highestPrice: number;
}

@Component({
  selector: 'app-po-comparison',
  templateUrl: './po-comparison.component.html',
  styleUrls: ['./po-comparison.component.css'],
  imports: [CommonModule],
})
export class PoComparisonComponent {
  uploadedFiles: File[] = [];
  parsedData: SupplierData[] = [];
  comparisonItems: ComparisonItem[] = [];
  supplierNames: string[] = [];
  error: string = '';

  onFileSelect(event: any): void {
    const files: FileList = event.target.files;
    this.error = '';

    Array.from(files).forEach((file) => {
      this.processFile(file);
    });

    event.target.value = '';
  }

  async processFile(file: File): Promise<void> {
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

      // console.log('Raw Excel data:', jsonData); // Debug log

      // Normalize column names and extract data
      const items: POItem[] = jsonData
        .map((row) => {
          const normalizedRow: any = {
            itemName: '',
            unitPrice: 0,
            quantity: 0,
            total: 0,
          };

          // First pass: collect all values
          let unitOfMeasure = '';
          let rawQty = null;
          let rawPrice = null;
          let rawTotal = null;

          Object.keys(row).forEach((key) => {
            const normalizedKey = key
              .toLowerCase()
              .trim()
              .replace(/[_\s-]/g, '');
            const value = row[key];

            // Item Name - from "item" column
            if (normalizedKey === 'item') {
              normalizedRow.itemName = String(value).trim();
            }
            // Description - append to item name if exists
            else if (normalizedKey === 'description') {
              const desc = String(value).trim();
              if (desc && desc !== 'undefined' && normalizedRow.itemName) {
                normalizedRow.itemName += ' - ' + desc;
              } else if (desc && desc !== 'undefined') {
                normalizedRow.itemName = desc;
              }
            }
            // Unit - this is the unit of measurement (MT, LTR, etc.)
            else if (normalizedKey === 'unit') {
              unitOfMeasure = String(value).trim();
            }
            // Quantity
            else if (normalizedKey === 'quantity' || normalizedKey === 'qty') {
              rawQty = value;
            }
            // Price - this is the UNIT PRICE (price per single item)
            else if (
              normalizedKey === 'price' ||
              normalizedKey === 'unitprice'
            ) {
              rawPrice = value;
            }
            // Total - total line amount
            else if (
              normalizedKey === 'total' ||
              normalizedKey === 'amount' ||
              normalizedKey === 'lineamount'
            ) {
              rawTotal = value;
            }
          });

          // Add unit of measure to item name if it exists
          if (unitOfMeasure && normalizedRow.itemName) {
            normalizedRow.itemName += ' (' + unitOfMeasure + ')';
          }

          // Parse quantity
          if (rawQty !== null && rawQty !== undefined && rawQty !== '') {
            if (typeof rawQty === 'number') {
              normalizedRow.quantity = rawQty;
            } else {
              const cleaned = String(rawQty)
                .replace(/,/g, '')
                .replace(/[^0-9.-]/g, '');
              normalizedRow.quantity = parseFloat(cleaned) || 0;
            }
          }

          // Parse unit price (price per single item)
          if (rawPrice !== null && rawPrice !== undefined && rawPrice !== '') {
            if (typeof rawPrice === 'number') {
              normalizedRow.unitPrice = rawPrice;
            } else {
              const cleaned = String(rawPrice)
                .replace(/,/g, '')
                .replace(/[^0-9.-]/g, '');
              normalizedRow.unitPrice = parseFloat(cleaned) || 0;
            }
          }

          // Parse total if provided
          if (rawTotal !== null && rawTotal !== undefined && rawTotal !== '') {
            if (typeof rawTotal === 'number') {
              normalizedRow.total = rawTotal;
            } else {
              const cleaned = String(rawTotal)
                .replace(/,/g, '')
                .replace(/[^0-9.-]/g, '');
              normalizedRow.total = parseFloat(cleaned) || 0;
            }
          }

          // Calculate total from unit price and quantity
          if (
            (!normalizedRow.total || normalizedRow.total === 0) &&
            normalizedRow.unitPrice > 0 &&
            normalizedRow.quantity > 0
          ) {
            normalizedRow.total =
              Math.round(
                normalizedRow.unitPrice * normalizedRow.quantity * 100
              ) / 100;
          }

          // Calculate unit price from total and quantity if unit price not provided
          if (
            (!normalizedRow.unitPrice || normalizedRow.unitPrice === 0) &&
            normalizedRow.total > 0 &&
            normalizedRow.quantity > 0
          ) {
            normalizedRow.unitPrice =
              Math.round((normalizedRow.total / normalizedRow.quantity) * 100) /
              100;
          }

          // console.log('Processed row:', {
          //   itemName: normalizedRow.itemName,
          //   unitPrice: normalizedRow.unitPrice,
          //   quantity: normalizedRow.quantity,
          //   total: normalizedRow.total,
          //   unitOfMeasure: unitOfMeasure,
          // }); // Debug log

          return normalizedRow as POItem;
        })
        .filter((item) => item.itemName && item.itemName !== '');

      const supplierName = file.name.replace(/\.(xlsx|xls)$/i, '');
      const totalAmount = items.reduce(
        (sum, item) => sum + (item.total || 0),
        0
      );

      // console.log('Total items parsed:', items.length);
      // console.log('Total PO amount:', totalAmount);

      const supplierData: SupplierData = {
        supplier: supplierName,
        items: items,
        fileName: file.name,
        totalAmount: totalAmount,
      };

      this.uploadedFiles.push(file);
      this.parsedData.push(supplierData);
      this.generateComparison();
    } catch (err) {
      this.error =
        'Error parsing Excel file. Please ensure it has the required columns.';
      console.error('Parse error:', err);
    }
  }

  generateComparison(): void {
    if (this.parsedData.length === 0) return;

    // Get all unique item names
    const allItems = new Set<string>();
    this.parsedData.forEach((supplier) => {
      supplier.items.forEach((item) => {
        allItems.add(item.itemName);
      });
    });

    // Update supplier names
    this.supplierNames = this.parsedData.map((s) => s.supplier);

    // Create comparison data
    this.comparisonItems = Array.from(allItems).map((itemName) => {
      const suppliers: any = {};
      let lowestPrice = Infinity;
      let highestPrice = -Infinity;

      this.parsedData.forEach((supplierData) => {
        const item = supplierData.items.find((i) => i.itemName === itemName);

        if (item) {
          suppliers[supplierData.supplier] = {
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            total: item.total,
          };

          if (item.unitPrice < lowestPrice) lowestPrice = item.unitPrice;
          if (item.unitPrice > highestPrice) highestPrice = item.unitPrice;
        }
      });

      return {
        itemName,
        suppliers,
        lowestPrice: lowestPrice === Infinity ? 0 : lowestPrice,
        highestPrice: highestPrice === -Infinity ? 0 : highestPrice,
      };
    });
  }

  removeFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
    this.parsedData.splice(index, 1);

    if (this.parsedData.length === 0) {
      this.comparisonItems = [];
      this.supplierNames = [];
    } else {
      this.generateComparison();
    }
  }

  getPriceDifferenceClass(
    price: number,
    lowestPrice: number,
    highestPrice: number
  ): string {
    if (price === lowestPrice && lowestPrice !== highestPrice)
      return 'lowest-price';
    if (price === highestPrice && lowestPrice !== highestPrice)
      return 'highest-price';
    return '';
  }

  getCheapestSupplier(): string {
    if (this.parsedData.length === 0) return '';

    const cheapest = this.parsedData.reduce((min, supplier) =>
      supplier.totalAmount < min.totalAmount ? supplier : min
    );

    return cheapest.supplier;
  }
}

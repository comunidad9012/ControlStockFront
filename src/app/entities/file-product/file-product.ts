import { ScannerProduct } from '../scanner-product/scanner-product';

export class FileProduct {
    id?: number;
    productName: string;
    mark: string;
    amount: number;
    scannedProduct?: ScannerProduct;
}

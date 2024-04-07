import { parseProducts, Product } from './index';
import { describe, test, expect } from 'vitest';

describe('parsing product object to array', () => {
  // TODO: this needs to be changed when we will be removing extra properties
  test('simple', () => {
    const products: Product[] = [{ sku: 'asd-123' }];
    const expected = '[["asd-123","","",0,1,"","",{}]]';
    const result = parseProducts(products);
    expect(result).toBe(expected);
  });
  //   test('only sku defined', () => {
  //     const products: Product[] = [{ sku: 'asd-123' }];
  //     const expected = '[["asd-123"]]';
  //     const result = parseProducts(products);
  //     expect(result).toBe(expected);
  //   });
  //   test('applies default to missing name', () => {
  //     const products: Product[] = [{ sku: 'asd-123', category: 'category' }];
  //     const expected = '[["asd-123","","category"]]';
  //     const result = parseProducts(products);
  //     expect(result).toBe(expected);
  //   });
  //   test('applies default to all previous missing elements', () => {
  //     const products: Product[] = [{ sku: 'asd-123', customDimensions: { 1: 'x' } }];
  //     const expected = '[["asd-123","","","",0,1,"","",{"1":"x"}]]';
  //     const result = parseProducts(products);
  //     expect(result).toBe(expected);
  //   });
});



export class Stock {

  public id             ?: number;
  public code           ?: string;
  public name    ?: string;
  public wholesalePrice   ?: string;
  public retailPrice    ?: string;
  public itemType   ?: number;
  public inStock             ?: number;




    constructor(code: string, name: string, itemType: number) {

    this.code = code;
    this.name = name;
    this.itemType = itemType;

  }

}

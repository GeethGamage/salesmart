

export class Stock {

  public id             ?: number;
  public code           ?: string;
  public name    ?: string;
  public wholesalePrice   ?: string;
  public retailPrice    ?: string;
  public iteamType   ?: string;
  public inStock             ?: number;




    constructor(code: string, name: string, iteamType: string) {

    this.code = code;
    this.name = name;
    this.iteamType = iteamType;

  }

}

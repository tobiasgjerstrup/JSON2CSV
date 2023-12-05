export class Json2csv {
  public header = [];
  public data = [];
  public csv = "";

  public async runAll(object) {
    await this.seedHeader(object);
    await this.getData(object);
    await this.getCsv();
  }

  private async seedHeader(object, fullKey = "") {
    for (const key in object) {
      if (typeof object[key] === "object") {
        if (!Number(key) && key !== "0") {
          this.seedHeader(object[key], `${fullKey}.${key}`);
        } else {
          this.seedHeader(object[key], fullKey);
        }
      } else {
        if (!this.header.includes(`${fullKey}.${key}`.slice(1))) {
          this.header[this.header.length] = `${fullKey}.${key}`.slice(1);
        }
      }
    }
  }

  private async getData(object) {
    console.log(typeof object)
    for (let x = 0; x < object.length; x++) {
      this.data[x] = [];
      for (let i = 0; i < this.header.length; i++) {
        const propertyNames = this.header[i].split(".");
        if (propertyNames.length > 1) {
          let currentObject = object[x];
          for (const propertyName of propertyNames) {
            if (currentObject) currentObject = currentObject[propertyName];
          }
          this.data[x][i] = currentObject;
        } else {
          this.data[x][i] = object[x][this.header[i]];
        }
      }
    }
  }

  private async getCsv() {
    for (let i = 0; i < this.header.length; i++) {
      this.csv += `${this.header[i]};`;
    }

    this.csv = this.csv.slice(0, -1);

    for (let i = 0; i < this.data.length; i++) {
      this.csv += "\r\n";
      for (let x = 0; x < this.data[i].length; x++) {
        if (!this.data[i][x])
          this.data[i][x] = ''
        this.csv += `${this.data[i][x]};`;
      }
      this.csv = this.csv.slice(0, -1);
    }
  }
}

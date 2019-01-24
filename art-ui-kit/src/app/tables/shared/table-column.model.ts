export class TableColumn {
    label: string;
    headerClasses: string;
    cellClasses: string;
    displayOrder: number;
    displayFn: Function;

    constructor(label?: string, headerClasses?: string, cellClasses?: string, displayOrder?: number, displayFn?: Function) {
        this.label = label;
        this.headerClasses = headerClasses;
        this.cellClasses = cellClasses;
        this.displayOrder = displayOrder;
        this.displayFn = displayFn;
    }
}

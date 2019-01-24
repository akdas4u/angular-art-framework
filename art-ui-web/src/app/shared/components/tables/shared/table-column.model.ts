export class TableColumn {
    label: string;
    classes: string;
    displayFn: Function;

    constructor(label?: string, classes?: string, displayFn?: Function) {
        this.label = label;
        this.classes = classes;
        this.displayFn = displayFn;
    }
}

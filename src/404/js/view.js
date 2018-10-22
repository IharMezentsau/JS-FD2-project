export class View {
    constructor(root) {
        this.root = root;
        this.element = null;
        this.checkbox = null;
        this.checkedChangeHandler = null;
    }

    render(model) {
        if (!this.element) {
            this.element = document.createElement('div');
            this.checkbox = document.createElement('input');
            this.checkbox.type = 'checkbox';
            this.checkbox.checked = true;
            this.checkbox.addEventListener('change',
                e => this.checkedChangeHandler(e.target.checked));
            this.root.appendChild(this.checkbox);
            this.root.appendChild(this.element);
        }
        this.element.textContent = model.date;
    }

    setChangeHandler(handler) {
        this.checkedChangeHandler = handler;
    }
}
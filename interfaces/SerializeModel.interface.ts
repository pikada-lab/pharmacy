export default interface SerializeModel {
    getModel(): {[k:string]: number|string|boolean|null};
    setModel(structure: {[k:string]: number|string|boolean|null}): void;
}
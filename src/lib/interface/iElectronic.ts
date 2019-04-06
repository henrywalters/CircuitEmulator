import { Lead } from "../lead";
import Vector from "../vector";

export default interface IElectronic {
    name: string;
    uid: string;
    inputs: Array<Lead>;
    outputs: Array<Lead>;

    updateOutput(): void;
}

export function MoveLeadsRelativeToComponent(component: IElectronic, delta: Vector) {
    component.inputs.forEach(lead => {
        lead.position = lead.position.add(delta);
    })

    component.outputs.forEach(lead => {
        lead.position = lead.position.add(delta);
    })
}

export function IsElectronic(object: any): object is IElectronic {
    return 'name' in object && 'uid' in object && 'inputs' in object && 'outputs' in object && 'updateOutput' in object;
}
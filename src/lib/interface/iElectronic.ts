import { Lead } from "../lead";

export default interface IElectronic {
    name: string;
    uid: string;
    inputs: Array<Lead>;
    outputs: Array<Lead>;

    updateOutput(): void;
}
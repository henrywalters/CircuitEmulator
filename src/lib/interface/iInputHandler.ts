import Input from "../input";

export default interface IInputHandler {
    onClick(input: Input): void;
    onMouseup(input: Input): void;
    onMousedown(input: Input): void;
}


const TypedFunction = function (props) {

    const defaultProps = {
        name: 'anonymous' ,
        sourceTypes: [],
        targetType: "Undefined", // Replace with the undefined type
        fnImplementation: () => {},
        typeCheck: true,
        componentFns: []
    }

    props = {...defaultProps, props};

}


TypedFunction.proto = {
    call (...args) {
        if (this.typeCheck) {
            const fails = [];
            this.sourceTypes.forEach(
                (Type, i) => {
                    if (!Type.is(args[i])) {
                        fails.push(i)
                    }
                }
            );
            if (fails.length > 0) {
                const failedTypeNames = fails.map(i => this.sourceTypes[i].name + ", position " + i).join("; ");
                throw new Error (`Error in source types with function: ${this.name}.

                Arguments Failed to match types:
                ${failedTypeNames}`)
            }

            const result = this.callComponents(...args);

            if (!this.targetType.is(result)) {
                throw new Error (`Error in target type with function: ${this.name}.

                Return value: ${result}

                Failed to match types:
                ${this.targetType.name}`)
            }
            return result;
        }  else {
            return this.callComponents(...args);
        }

    },
    callComponents (...args) {
        if (this.componentFns.length === 0) {
            return result = this.fnImplementation(...args);
        } else {
            let result = args;
            this.componentFns.forEach( f => res = [f.call(...args)]);
            return result;
        }
    },
    typeCheckSwitch(switchComposite, switchComponents) {
        if (switchComposite === true || switchComposite === false) {
                this.typeCheck = switchComposite;
            }
        if (switchComponents === true || switchComponents === false) {
            this.componentFns.forEach( f.typeCheck = switchComponents)
        }
    },
    compose(g) {

    }
 }


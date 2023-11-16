import React from "react";

export class BondsContainer {
    validator;

    constructor(validator: BondsDataValidator) {
        this.validator = validator;
    }

    create(bondEntry: string[]): React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>, HTMLElement> {
        const isValid = this.validator.validate(bondEntry);

        if (isValid === false) {
            console.error("Found an invalid bond entry");
            
            const bondContainer = React.createElement("div", null, "")

            return bondContainer;
        }
           

        const name = React.createElement("span", null, bondEntry[0]);
        const price = React.createElement("span", null, bondEntry[1]);
        const gainLoss = React.createElement("span", null, bondEntry[2]);
        const percentGainLoss = React.createElement("span", null, bondEntry[3]);
        const snapshotTime = React.createElement("span", null, bondEntry[4]);
        const snapshotDate = React.createElement("span", null, bondEntry[4]);
        const open = React.createElement("span", null, bondEntry[4]);
        const high = React.createElement("span", null, bondEntry[5]);
        const low = React.createElement("span", null, bondEntry[6]);

        const bondInformation = [
            name, price, gainLoss, percentGainLoss, snapshotDate, snapshotTime, open, high, low
        ]

        const bondContainer = React.createElement("div", null, bondInformation)

        return bondContainer
    }
}

export class BondsDataValidator {
    validate(bondEntry: string[]) {
        if (bondEntry.length !== 7)
            return false;
        if (bondEntry[0] === "")
            return false
        if (bondEntry[1] === "")
            return false
        if (bondEntry[2] === "")
            return false
        if (bondEntry[3] === "")
            return false
        if (bondEntry[4] === "")
            return false
        if (bondEntry[5] === "")
            return false
        if (bondEntry[6] === "")
            return false
        return true;
    }
}
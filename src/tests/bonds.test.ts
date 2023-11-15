import { BondsDataValidator } from "../AlexNovitchkovBurbank/bonds"

describe("Test the bond entry validator", () => {
    it("The bond entry should be valid with 7 entries in data entry", () => {
        const bondsDataValidator = new BondsDataValidator();

        let bondEntry: string[] = [];

        bondEntry.push("");
        bondEntry.push("");
        bondEntry.push("");
        bondEntry.push("");
        bondEntry.push("");
        bondEntry.push("");
        bondEntry.push("");

        const isValid = bondsDataValidator.validate(bondEntry);

        expect(isValid).toBe(true);
    })

    it("The bond entry should be invalid with 6 entries in data entry", () => {
        const bondsDataValidator = new BondsDataValidator();

        let bondEntry: string[] = [];

        bondEntry.push("");
        bondEntry.push("");
        bondEntry.push("");
        bondEntry.push("");
        bondEntry.push("");
        bondEntry.push("");

        const isValid = bondsDataValidator.validate(bondEntry);

        expect(isValid).toBe(false);
    })

    it("The bond entry should be invalid with 8 spots in data entry", () => {
        const bondsDataValidator = new BondsDataValidator();

        let bondEntry: string[] = [];

        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");

        const isValid = bondsDataValidator.validate(bondEntry);

        expect(isValid).toBe(false);
    })

    it("The bond entry should be invalid with empty 1st spot in data entry", () => {
        const bondsDataValidator = new BondsDataValidator();

        let bondEntry: string[] = [];

        bondEntry.push("");
        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");

        const isValid = bondsDataValidator.validate(bondEntry);

        expect(isValid).toBe(false);
    })

    it("The bond entry should be invalid with empty 2nd spot in data entry", () => {
        const bondsDataValidator = new BondsDataValidator();

        let bondEntry: string[] = [];

        bondEntry.push("a");
        bondEntry.push("");
        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");

        const isValid = bondsDataValidator.validate(bondEntry);

        expect(isValid).toBe(false);
    })

    it("The bond entry should be invalid with empty 3rd spot in data entry", () => {
        const bondsDataValidator = new BondsDataValidator();

        let bondEntry: string[] = [];

        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("");
        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");

        const isValid = bondsDataValidator.validate(bondEntry);

        expect(isValid).toBe(false);
    })

    it("The bond entry should be invalid with empty 4th spot in data entry", () => {
        const bondsDataValidator = new BondsDataValidator();

        let bondEntry: string[] = [];

        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("");
        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");

        const isValid = bondsDataValidator.validate(bondEntry);

        expect(isValid).toBe(false);
    })

    it("The bond entry should be invalid with empty 5th spot in data entry", () => {
        const bondsDataValidator = new BondsDataValidator();

        let bondEntry: string[] = [];

        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("");
        bondEntry.push("a");
        bondEntry.push("a");

        const isValid = bondsDataValidator.validate(bondEntry);

        expect(isValid).toBe(false);
    })

    it("The bond entry should be invalid with empty 6th spot in data entry", () => {
        const bondsDataValidator = new BondsDataValidator();

        let bondEntry: string[] = [];

        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("");
        bondEntry.push("a");

        const isValid = bondsDataValidator.validate(bondEntry);

        expect(isValid).toBe(false);
    })

    it("The bond entry should be invalid with empty 7th spot in data entry", () => {
        const bondsDataValidator = new BondsDataValidator();

        let bondEntry: string[] = [];

        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("a");
        bondEntry.push("");

        const isValid = bondsDataValidator.validate(bondEntry);

        expect(isValid).toBe(false);
    })
})
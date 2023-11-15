import { BondsDataValidator, BondsContainer } from "../AlexNovitchkovBurbank/bonds"
import BondsPageHeader from "./bondsPageHeader"

const bondEntry1 = [
    "a", "a", "a", "a", "a", "a", "a"
]

const bondEntry2 = [
    "a", "b", "a", "a", "a", "a", "a"
]


const bondEntries = [
    bondEntry1,
    bondEntry2
]

// later I will hook up the file and these arrays will go away

export default function BondsComponent() {
    const bondsDataValidator = new BondsDataValidator();
    const bondsContainer = new BondsContainer(bondsDataValidator);
    let containerOfbondContainers = [];

    for (const bondEntry of bondEntries) {
        const container = bondsContainer.create(bondEntry);
        containerOfbondContainers.push(container);
    }

    return (<div><BondsPageHeader />{containerOfbondContainers}</div>)
}
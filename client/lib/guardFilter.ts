import { NextRouter } from "next/router";
import { RealEstateType } from "../types/enums/realEstate";

export enum FilterState {
    Address = "address",
    Category = "category",
    Type = "type",
    Pricing = "pricing",
    Acreage = "acreage",
    SpecialType = "special-type",
    NumberOfBedrooms = 'bedroom',
    Direction = 'direction'
}

export function GuardFilter(state: FilterState, type: RealEstateType | "All" | undefined) {
    if (state === FilterState.Acreage) {
        if (type === "All" || type === undefined) {
            return false
        }
        return true
    }

    if (state === FilterState.SpecialType) {
        if(type === "All" || type === RealEstateType.PhongTro || type === undefined) {
            return false
        }
        return true
    }

    if (state === FilterState.NumberOfBedrooms) {
        if(type === "All" || type === RealEstateType.Dat || type === RealEstateType.VanPhong || type === RealEstateType.PhongTro || type === undefined) {
            return false
        }

        return true
    }

    if (state === FilterState.Direction) {
        if(type === "All" || type === RealEstateType.PhongTro || type === undefined) {
            return false
        }

        return true
    }

    return false
}
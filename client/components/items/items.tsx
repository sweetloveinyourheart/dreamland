import Image from "next/image";
import { useRouter } from "next/router";
import { FunctionComponent, useCallback } from "react";
import { FaClock, FaShieldAlt } from "react-icons/fa";
import Moment from "react-moment";
import { moneyConverter } from "../../lib/converter";
import { RealEstateCategory, RealEstateType } from "../../types/enums/realEstate";
import styles from './items.module.scss'

export interface ItemDataDisplay {
    __typename: string
    title: string,
    media: {
        images: string[]
    }
    detail: {
        acreage: {
            totalAcreage: number
        }
        pricing: {
            total: number
        }
        address: {
            province: string
        }
    }
    overview?: any
    timeStamp: Date
    directLink: string
    category: RealEstateCategory
}

interface ItemsProps {
    vertical?: boolean
    guard?: boolean
    data: ItemDataDisplay[]
}

const Items: FunctionComponent<ItemsProps> = ({ guard, vertical, data }) => {
    const router = useRouter()

    const realEstateType = useCallback((type: string): string => {
        switch (type) {
            case "Apartment":
                return RealEstateType.CanHo
            case "House":
                return RealEstateType.NhaO
            case "Land":
                return RealEstateType.Dat
            case "BusinessPremises":
                return RealEstateType.VanPhong
            case "Motal":
                return RealEstateType.PhongTro
            default:
                return ""
        }
    }, [])

    const renderData = (): JSX.Element[] => {
        return data.map((el, id) => {
            return (
                <div className={styles['col']} key={id} onClick={() => router.push(`/chi-tiet/${realEstateType(el.__typename)}/${el.directLink}`)}>
                    <div className={styles['item'] + (vertical ? ` ${styles['item--vertical']}` : "")}>
                        <div className={styles['item__image']}>
                            <Image
                                width={800}
                                height={600}
                                alt=""
                                src={el.media.images[0]}
                            />
                        </div>
                        <div className={styles['item-desc']}>
                            <div className={styles['item-desc__name']}>
                                {guard && <span><FaShieldAlt /> Đối Tác</span>}
                                {el.title}
                            </div>
                            <div className={styles['item-desc__acreage']}>
                                {el.detail.acreage.totalAcreage} m²
                                {el.overview?.numberOfBedrooms ? `- ${el.overview?.numberOfBedrooms} PN` : ""} </div>
                            <div className={styles['item-desc__price']}>
                                {moneyConverter(el.detail.pricing.total)}{el.category === RealEstateCategory.ChoThue ? "/Tháng" : ""}
                            </div>
                            <div className={styles['item-detail'] + (vertical ? ` ${styles['item-detail--vertical']}` : "")}>
                                <div className={styles['item-detail__timestamp']}>
                                    <FaClock />
                                    &nbsp;
                                    <p><Moment format="DD/MM/yyyy">{el.timeStamp}</Moment></p>
                                </div>
                                <div className={styles['item-detail__address']}>
                                    {el.detail.address.province} 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className={styles['items'] + (vertical ? ` ${styles['items--vertical']}` : "")}>
            {renderData()}
        </div>
    );
}

export default Items;
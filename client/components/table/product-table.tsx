import { useQuery } from "@apollo/client";
import { FunctionComponent } from "react";
import { GetProjectProductData, GetProjectProductVars, GET_PROJECT_PRODUCT } from "../../graphql/queries/projectPage";
import { moneyConverter, productStatusReader } from "../../lib/converter";
import styles from './product-table.module.scss'

interface ProjectProductsProps {
    project: string
}

const ProjectProducts: FunctionComponent<ProjectProductsProps> = ({ project }) => {

    const { data } = useQuery<GetProjectProductData, GetProjectProductVars>(GET_PROJECT_PRODUCT, {
        variables: {
            project
        }
    })

    const renderData = () => {
        let result;

        if (data) {
            result = data.products.map((product, index) => {
                return (
                    <li className={styles["table-row"]} key={index}>
                        <div className={styles["col-sm"]}>{product.code}</div>
                        <div className={styles["col-md"]}>{product.totalAcreage}</div>
                        <div className={styles["col-md"]}>{product.quantity}</div>
                        <div className={styles["col-md"]}>{moneyConverter(product.price)}</div>
                        <div className={styles["col-md"]}>{product.usedAcreage}</div>
                        <div className={styles["col-xl"]}>{product.description}</div>
                        <div className={styles["col-md"]}>{productStatusReader(product.status)}</div>
                    </li>
                )
            })
        }

        return result
    }

    return (
        <div className={styles["container"]}>
            <ul className={styles["responsive-table"]}>
                <li className={styles["table-header"]}>
                    <div className={styles["col-sm"]}>Mã</div>
                    <div className={styles["col-md"]}>Diện tích</div>
                    <div className={styles["col-md"]}>Số thửa</div>
                    <div className={styles["col-md"]}>Giá bán</div>
                    <div className={styles["col-md"]}>Thổ cư</div>
                    <div className={styles["col-xl"]}>Ghi chú</div>
                    <div className={styles["col-md"]}>Trạng thái</div>
                </li>
               {renderData()}
            </ul>
        </div>
    );
}

export default ProjectProducts;
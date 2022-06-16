import { FunctionComponent, ReactNode } from "react";
import styles from './grid-system.module.scss'

interface SpecialContainerProps {
    children?: ReactNode
}

export const SpecialContainer: FunctionComponent<SpecialContainerProps> = ({ children }) => {
    return (
        <div className={styles['container-special']}>
            {children}
        </div>
    );
}

interface ContainerProps {
    fluid?: boolean
    children?: ReactNode
}

export const Container: FunctionComponent<ContainerProps> = ({ fluid, children }) => {
    return (
        <div className={
            fluid ? styles['container-fluid'] : styles['container']
        }>
            {children}
        </div>
    );
}

interface RowProps {
    reverse?: boolean
    children?: ReactNode
}

export const Row: FunctionComponent<RowProps> = ({ reverse, children }) => {
    return (
        <div className={`${styles['row']} ${reverse ? styles['reverse'] : ''}`}>
            {children}
        </div>
    );
}

interface ColProps {
    reverse?: boolean
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    children?: ReactNode
}

export const Col: FunctionComponent<ColProps> = ({ reverse, children, xs, sm, md, lg, xl }) => {
    return (
        <div className={
            styles['col'] +
            (reverse ? ` ${styles['reverse']}` : '') +
            (xs ? ` ${styles[`col-xs-${xs}`]}` : '') +
            (sm ? ` ${styles[`col-sm-${sm}`]}` : '') +
            (md ? ` ${styles[`col-md-${md}`]}` : '') +
            (lg ? ` ${styles[`col-lg-${lg}`]}` : '') +
            (xl ? ` ${styles[`col-xl-${xl}`]}` : '')
        }>
            {children}
        </div>
    );
}
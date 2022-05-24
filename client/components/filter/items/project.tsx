import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FunctionComponent, useCallback } from "react";
import { FaCheckCircle, FaCheckSquare, FaChevronRight, FaFilter, FaTimes } from "react-icons/fa";
import { GetProjectsListData, GET_PROJECTS_LIST } from "../../../graphql/queries/browsingPost";
import styles from './items.module.scss'


interface ProjectFilterProps {
    project?: string
    onActive: () => void
}

const ProjectFilter: FunctionComponent<ProjectFilterProps> = ({ onActive, project }) => {
    const router = useRouter()
    const { data, error, loading } = useQuery<GetProjectsListData>(GET_PROJECTS_LIST)

    const activeFilter = useCallback((project: string) => {
        router.push({
            query: {
                ...router.query,
                project: project
            }
        })
    }, [router])

    const onDisableFilter = useCallback(() => {
        let currentQuery = router.query
        delete currentQuery.project
        router.push({
            query: { ...currentQuery }
        })
        onActive()
    }, [router])

    const renderProjects = () => {
        let elm;
        if (data) {
            elm = data.projects.map((elm, id) => {
                return (
                    <div 
                        className={styles['selector']} 
                        onClick={() => activeFilter(elm._id)} key={id}
                        style={{ color: project === elm._id ? "#14a7fa" : "#222" }}
                    >
                        <span>{elm.projectName}</span>
                        <FaCheckSquare style={{ fontSize: 20 }} color={project === elm._id ? "#14a7fa" : "#dcdcdc"} />
                    </div>
                )
            })
        }
        return elm
    }

    return (
        <div className={styles['modal']}>
            <div className={styles['modal-header']}>
                <div><button onClick={() => onDisableFilter()}> <FaFilter/> Huỷ</button> </div>
                <h4>Chọn loại bất động sản</h4>
                <button onClick={() => onActive()}>
                    <FaTimes />
                </button>
            </div>
            <div className={styles['modal-content']}>
                <div className={styles['selectors']}>

                    {renderProjects()}
                </div>
            </div>
        </div>
    );
}

export default ProjectFilter;
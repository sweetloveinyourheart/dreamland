import { useLazyQuery, useQuery } from "@apollo/client";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaGripHorizontal } from "react-icons/fa";
import ProjectFilter from "../components/filter/projectFilter";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import ProjectPaging from "../components/paging/projectPaging";
import Projects from "../components/projects/projects";
import { useAddress } from "../contexts/address";
import { GetAllProjectsData, GetAllProjectsVars, GET_ALL_PROJECT_POSTS } from "../graphql/queries/browsingProject";
import { ProjectStatsData, PROJECT_STATS } from "../graphql/queries/paging";
import { initializeApollo } from "../lib/apolloClient";
import styles from '../styles/pages/du-an-bat-dong-san.module.scss'
import { ProjectInterface } from "../types/interfaces/project";
import { PaginationFilter } from "../types/interfaces/realEstate";

export const INIT_CURSOR = 0
export const INIT_LIMIT = 10
export const STEP = 10

interface ProjectPage {
    data: ProjectInterface[]
    pagingData: { projects: number }
}

const RealEstateProjectPage: NextPage<ProjectPage> = ({ data, pagingData }) => {
    const [isVerticalDisplay, setVerticalDisplay] = useState(true)
    const [projects, setProjects] = useState<ProjectInterface[]>([])
    const [filter, setFilter] = useState<any>()
    const [paging, setPaging] = useState<PaginationFilter>({
        limit: INIT_LIMIT,
        cursor: INIT_CURSOR
    })
    const [getProjects, { data: projectsData, error }] = useLazyQuery<GetAllProjectsData, GetAllProjectsVars>(GET_ALL_PROJECT_POSTS, {
        variables: {
            filter,
            paging
        },
        notifyOnNetworkStatusChange: true
    })

    let router = useRouter()
    const { getAddress } = useAddress()

    // collect data from fetched query
    useEffect(() => {
        if (projectsData && !error) {
            setProjects(projectsData.getProjects)
        }
    }, [projectsData])

    useEffect(() => {
        const { query } = router

        // category field is required, query field must > 1
        if (Object.keys(query).length > 0) {
            // extract filter from URL query 
            let address = getAddress(Number(query?.province), Number(query?.district), Number(query?.ward))
            let price = {
                ...(query?.price && { min: Number(String(query.price).split('-')[0]) }),
                ...(query?.price && { max: Number(String(query.price).split('-')[1]) })
            }

            // collect filter data
            let newFilter = {
                ...(Object.keys(address).length !== 0 && { address }),
                ...(Object.keys(price).length !== 0 && { price }),
            }

            setFilter(newFilter)

            // collect paging data
            let page = query?.page
            if (page) {
                // set cursor base on page 
                setPaging(s => ({ ...s, cursor: (Number(page) - 1) * STEP }))
            }
        } else {
            setFilter(undefined)
        }

    }, [router.query])

    // trigger query or take serverside data
    useEffect(() => {
        if (filter) {
            getProjects()

        } else {
            setProjects(data)
        }
    }, [filter, paging])

    return (
        <>
            <Head>
                <title>Dự án bất động sản</title>
            </Head>
            <Header />
            <main style={{ backgroundColor: "#f4f4f4", padding: '64px 0' }}>
                <ProjectFilter filter={filter} />
                <div className="container">
                    <div className={styles['project-area']}>
                        <h4>
                            <p>Tất cả dự án</p>
                            <button onClick={() => setVerticalDisplay(s => !s)}><FaGripHorizontal /></button>
                        </h4>
                        <Projects data={projects} vertical={isVerticalDisplay} />
                    </div>
                    <ProjectPaging paging={paging} data={pagingData} />
                </div>
            </main>
            <Footer />
        </>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    try {
        const client = initializeApollo()

        const result = await client.query<GetAllProjectsData, GetAllProjectsVars>({
            query: GET_ALL_PROJECT_POSTS,
            variables: {
                paging: { cursor: INIT_CURSOR, limit: INIT_LIMIT }
            }
        })

        const paging = await client.query<ProjectStatsData>({
            query: PROJECT_STATS
        })

        return {
            props: {
                data: result?.data.getProjects ?? [],
                pagingData: paging?.data.projectStats ?? { projects: 0 }
            },
            revalidate: 60
        }
    } catch (error) {
        return {
            props: {
                data: [],
                pagingData: { projects: 0 }
            },
            revalidate: 60,
        }
    }
}

export default RealEstateProjectPage
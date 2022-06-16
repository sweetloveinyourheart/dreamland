import { useQuery } from '@apollo/client';
import { Divider, Grid, Typography, Tabs, Tab, Box } from '@mui/material';
import CreateProject from 'components/create-project';
import ProjectList from 'components/project-list';
import UpdateProject from 'components/update-project';
import { GET_ALL_PROJECT_POSTS } from 'graphql/queries/project';
import SearchSection from 'layout/MainLayout/Header/SearchSection';
import { useCallback, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';

const Project = () => {
    const [menu, setMenu] = useState(0)
    const [selectedProject, setSelectedProject] = useState(null)

    const { data } = useQuery(GET_ALL_PROJECT_POSTS, {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'no-cache'
    })

    const onSelectProject = useCallback((project) => {
        setSelectedProject(project)
        setMenu(2)
    }, [selectedProject, menu])

    const renderMenu = () => {
        switch (menu) {
            case 0:
                return <ProjectList data={data?.projects} selectProject={onSelectProject} />

            case 1:
                return <CreateProject />

            case 2:
                return <UpdateProject project={selectedProject} />

            default:
                return <ProjectList data={data?.projects} selectProject={onSelectProject} />
        }
    }

    return (
        <MainCard>
            <Grid container spacing={1}>
                <Grid lg={3} xl={3} item>
                    <Typography variant="h3" sx={{ display: "flex", alignItems: "center", height: "100%" }}>
                        {menu === 0
                            ? "Danh sách dự án"
                            : menu === 1
                                ? "Thêm mới dự án"
                                : "Chỉnh sửa thông tin"
                        }
                    </Typography>
                </Grid>
                <Grid lg={6} xl={6} item>
                    {/* {menu === 0
                        && (
                            <Box display={"flex"} justifyContent="center">
                                <SearchSection />
                            </Box>
                        )
                    } */}
                </Grid>
                <Grid lg={3} xl={3} item>
                    <Box display={"flex"} justifyContent="flex-end">
                        <Tabs value={menu} onChange={(e, value) => setMenu(value)}>
                            <Tab label="Danh sách" id={`tab-1`} />
                            <Tab label="Thêm mới" id={`tab-2`} />
                        </Tabs>
                    </Box>
                </Grid>
            </Grid>
            <Divider sx={{ margin: 2 }} />
            {renderMenu()}
        </MainCard>
    );
}

export default Project
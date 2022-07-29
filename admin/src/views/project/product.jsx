import { Box, Divider, Grid, Tab, Tabs, Typography } from "@mui/material";
import CreateProjectProduct, { ProjectSelector } from "components/create-project-product";
import ProjectProductList from "components/project-products";
import { useState } from "react";
import MainCard from "ui-component/cards/MainCard";

const ProjectProduct = () => {
    const [menu, setMenu] = useState(0)
    const [selectedProject, setSelectedProject] = useState(null)

    const renderMenu = () => {
        switch (menu) {
            case 0:
                if (!selectedProject) {
                    return (
                        <Box minHeight={350} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography textAlign={"center"}>Chọn dự án để xem sản phẩm</Typography>
                        </Box>
                    )
                }
                return <ProjectProductList project={selectedProject}/>;

            case 1:
                return <CreateProjectProduct />

            default:
                return;
        }
    }

    const onSelectProject = (value) => {
        setSelectedProject(value)
    }

    return (
        <MainCard>
            <Grid container spacing={1}>
                <Grid lg={4} xl={4} item>
                    <Typography variant="h3" sx={{ display: "flex", alignItems: "center", height: "100%" }}>
                        {menu === 0
                            ? "Danh sách sản phẩm dự án"
                            : "Thêm mới sản phẩm dự án"
                        }
                    </Typography>
                </Grid>
                <Grid lg={4} xl={4} item>
                    {menu === 0
                        && (
                            <ProjectSelector value={selectedProject} setValue={onSelectProject} />
                        )
                    }
                </Grid>
                <Grid lg={4} xl={4} item>
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

export default ProjectProduct;
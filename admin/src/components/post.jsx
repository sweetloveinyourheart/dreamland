import { Box, Divider, Grid, Typography } from "@mui/material";
import { categories, directions, furniture, legalDocuments, ownerType, realEstateStatus } from "constants/realestate";
import { moneyConverter } from "helpers/money";
import SubCard from "ui-component/cards/SubCard";

const PostDetail = ({ post }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={12}>
                <SubCard title="Hình ảnh dự án">
                    <Grid marginTop={2} container spacing={1}>
                        {post.media.images.map((image, index) => (
                            <Grid item lg={3} key={index}>
                                <img src={image} style={{ width: '100%' }} />
                            </Grid>
                        ))}
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12} lg={6}>
                <SubCard title="Thông tin căn hộ">
                    <Box margin={"12px 0"}>
                        <Typography variant='h4' marginBottom={1}>
                            Thông tin chi tiết
                        </Typography>
                        <Divider />
                        <Grid container marginBottom={4} spacing={1}>
                            <Grid xs={12} xl={6} item marginY={1}>
                                <Typography fontWeight={600} marginBottom={1}>Giá</Typography>
                                <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                    <Typography>{moneyConverter(post.detail?.pricing?.total)}</Typography>
                                </Box>
                            </Grid>
                            {post.detail?.pricing?.deposit
                                && (
                                    <Grid xs={12} xl={6} item marginY={1}>
                                        <Typography fontWeight={600} marginBottom={1}>Đặt cọc:</Typography>
                                        <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                            <Typography>{moneyConverter(post.detail?.pricing?.deposit)}</Typography>
                                        </Box>
                                    </Grid>
                                )
                            }
                            {post.detail?.position?.blockName
                                && (
                                    <Grid xs={12} xl={6} item marginY={1}>
                                        <Typography fontWeight={600} marginBottom={1}>Block/Tháp</Typography>
                                        <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                            <Typography>{post.detail?.position?.blockName}</Typography>
                                        </Box>
                                    </Grid>
                                )
                            }
                            {post.detail?.position?.code?.value
                                && (
                                    <Grid xs={12} xl={6} item marginY={1}>
                                        <Typography fontWeight={600} marginBottom={1}>Mã căn</Typography>
                                        <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                            <Typography>{post.detail?.position?.code?.value}</Typography>
                                        </Box>
                                    </Grid>
                                )
                            }
                            {post.detail?.position?.floorNumber
                                && (
                                    <Grid xs={12} xl={6} item marginY={1}>
                                        <Typography fontWeight={600} marginBottom={1}>Tầng số</Typography>
                                        <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                            <Typography>{post.detail?.position?.floorNumber}</Typography>
                                        </Box>
                                    </Grid>
                                )
                            }

                            {post.detail?.acreage?.totalAcreage
                                && (
                                    <Grid xs={12} xl={6} item marginY={1}>
                                        <Typography fontWeight={600} marginBottom={1}>Tổng diện tích</Typography>
                                        <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                            <Typography>{post.detail?.acreage?.totalAcreage}</Typography>
                                        </Box>
                                    </Grid>
                                )
                            }
                            {post.detail?.acreage?.usedAcreage
                                && (
                                    <Grid xs={12} xl={6} item marginY={1}>
                                        <Typography fontWeight={600} marginBottom={1}>Diện tích sử dụng</Typography>
                                        <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                            <Typography>{post.detail?.acreage?.usedAcreage}</Typography>
                                        </Box>
                                    </Grid>
                                )
                            }
                            {post.detail?.acreage?.height
                                && (
                                    <Grid xs={12} xl={6} item marginY={1}>
                                        <Typography fontWeight={600} marginBottom={1}>Chiều dài</Typography>
                                        <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                            <Typography>{post.detail?.acreage?.height}</Typography>
                                        </Box>
                                    </Grid>
                                )
                            }
                            {post.detail?.acreage?.width
                                && (
                                    <Grid xs={12} xl={6} item marginY={1}>
                                        <Typography fontWeight={600} marginBottom={1}>Chiều ngang</Typography>
                                        <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                            <Typography>{post.detail?.acreage?.width}</Typography>
                                        </Box>
                                    </Grid>
                                )
                            }
                            <Grid xs={12} xl={6} item marginY={1}>
                                <Typography fontWeight={600} marginBottom={1}>Địa chỉ</Typography>
                                <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                    <Typography>{post.detail?.address?.province} - {post.detail?.address?.district} - {post.detail?.address?.ward} - {post.detail?.address?.houseNumber} {post.detail?.address?.street}  </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box margin={"12px 0"}>
                        <Typography variant='h4' marginBottom={1}>
                            Thông tin chi tiết
                        </Typography>
                        <Divider />
                        <Grid container marginBottom={4} spacing={1}>
                            {post.overview?.doorDirection
                                && (
                                    <Grid xs={12} xl={6} item marginY={1}>
                                        <Typography fontWeight={600} marginBottom={1}>Hướng cửa chính</Typography>
                                        <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                            <Typography>{directions.find(v => v.value === post.overview?.doorDirection).label}</Typography>
                                        </Box>
                                    </Grid>
                                )
                            }
                            {post.overview?.balconyDirection
                                && (
                                    <Grid xs={12} xl={6} item marginY={1}>
                                        <Typography fontWeight={600} marginBottom={1}>Hướng ban công</Typography>
                                        <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                            <Typography>{directions.find(v => v.value === post.overview?.balconyDirection).label}</Typography>
                                        </Box>
                                    </Grid>
                                )
                            }
                            {post.overview?.status
                                && (
                                    <Grid xs={12} xl={6} item marginY={1}>
                                        <Typography fontWeight={600} marginBottom={1}>Tình trạng bất động sản</Typography>
                                        <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                            <Typography>{realEstateStatus.find(v => v.value === post.overview?.status).label}</Typography>
                                        </Box>
                                    </Grid>
                                )
                            }
                            {post.overview?.furniture
                                && (
                                    <Grid xs={12} xl={6} item marginY={1}>
                                        <Typography fontWeight={600} marginBottom={1}>Tình trạng nội thất</Typography>
                                        <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                            <Typography>{furniture.find(v => v.value === post.overview?.furniture).label}</Typography>
                                        </Box>
                                    </Grid>
                                )
                            }
                            {post.overview?.legalDocuments
                                && (
                                    <Grid xs={12} xl={6} item marginY={1}>
                                        <Typography fontWeight={600} marginBottom={1}>Giấy tờ pháp lý</Typography>
                                        <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                            <Typography>{legalDocuments.find(v => v.value === post.overview?.legalDocuments).label}</Typography>
                                        </Box>
                                    </Grid>
                                )
                            }
                            {post.overview?.noHau
                                && (
                                    <Grid xs={12} xl={6} item marginY={1}>
                                        <Typography fontWeight={600} marginBottom={1}>Nở hậu</Typography>
                                        <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                            <Typography>{post.overview.noHau ? "Nở hậu" : "Không đề cập"}</Typography>
                                        </Box>
                                    </Grid>
                                )
                            }

                            {post.overview?.frontispiece
                                && (
                                    <Grid xs={12} xl={6} item marginY={1}>
                                        <Typography fontWeight={600} marginBottom={1}>Nhà mặt tiền</Typography>
                                        <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                            <Typography>{post.overview.frontispiece ? "Nhà Mặt tiền" : "Không đề cập"}</Typography>
                                        </Box>
                                    </Grid>
                                )
                            }
                            {post.overview?.carAlley
                                && (
                                    <Grid xs={12} xl={6} item marginY={1}>
                                        <Typography fontWeight={600} marginBottom={1}>Hẻm xe hơi</Typography>
                                        <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                            <Typography>{post.overview.carAlley ? "Hẻm xe hơi" : "Không đề cập"}</Typography>
                                        </Box>
                                    </Grid>
                                )
                            }
                            {post.overview?.numberOfBedrooms
                                && (
                                    <Grid xs={12} xl={6} item marginY={1}>
                                        <Typography fontWeight={600} marginBottom={1}>Số phòng ngủ</Typography>
                                        <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                            <Typography>{post.overview.numberOfBedrooms}</Typography>
                                        </Box>
                                    </Grid>
                                )
                            }
                            {post.overview?.numberOfBathrooms
                                && (
                                    <Grid xs={12} xl={6} item marginY={1}>
                                        <Typography fontWeight={600} marginBottom={1}>Số phòng vệ sinh</Typography>
                                        <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                            <Typography>{post.overview.numberOfBathrooms}</Typography>
                                        </Box>
                                    </Grid>
                                )
                            }
                            {post.overview?.numberOfFloors
                                && (
                                    <Grid xs={12} xl={6} item marginY={1}>
                                        <Typography fontWeight={600} marginBottom={1}>Số tầng lầu</Typography>
                                        <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                            <Typography>{post.overview.numberOfFloors}</Typography>
                                        </Box>
                                    </Grid>
                                )
                            }
                        </Grid>
                    </Box>

                </SubCard>
            </Grid>
            <Grid item xs={12} lg={6}>
                <SubCard title="Chi tiết bài đăng">
                    <Box margin={"12px 0"}>
                        <Typography variant='h4' marginBottom={1}>
                            Thông tin bài đăng
                        </Typography>
                        <Divider />
                        <Grid container marginBottom={4} spacing={1}>
                            <Grid xs={12} xl={12} item marginY={1}>
                                <Typography fontWeight={600} marginBottom={1}>Tiêu đề bài đăng</Typography>
                                <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                    <Typography>{post.title}</Typography>
                                </Box>
                            </Grid>
                            <Grid xs={12} xl={12} item marginY={1}>
                                <Typography fontWeight={600} marginBottom={1}>Chi tiết bài đăng</Typography>
                                <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                    <Typography whiteSpace={"pre-wrap"}>{post.description}</Typography>
                                </Box>
                            </Grid>
                            <Grid xs={12} xl={12} item marginY={1}>
                                <Typography fontWeight={600} marginBottom={1}>Danh mục bất động sản</Typography>
                                <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                    <Typography>{categories.find(v => v.value === post.category).label}</Typography>
                                </Box>
                            </Grid>
                            <Grid xs={12} xl={12} item marginY={1}>
                                <Typography fontWeight={600} marginBottom={1}>Mã bài đăng</Typography>
                                <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                    <Typography>{post.code}</Typography>
                                </Box>
                            </Grid>
                            <Grid xs={12} xl={12} item marginY={1}>
                                <Typography fontWeight={600} marginBottom={1}>Link thực tế ảo</Typography>
                                <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                    <Typography whiteSpace={"pre-wrap"}>{post.virtual3DLink}</Typography>
                                </Box>
                            </Grid>
                            <Grid xs={12} xl={12} item marginY={1}>
                                <Typography fontWeight={600} marginBottom={1}>Link google maps</Typography>
                                <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                    <Typography whiteSpace={"pre-wrap"}>{post.googleMapsLink}</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box margin={"12px 0"}>
                        <Typography variant='h4' marginBottom={1}>
                            Nguời đăng
                        </Typography>
                        <Divider />
                        <Grid container marginBottom={4} spacing={1}>
                            <Grid xs={12} xl={6} item marginY={1}>
                                <Typography fontWeight={600} marginBottom={1}>Tên người đăng</Typography>
                                <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                    <Typography>{post.owner?.name}</Typography>
                                </Box>
                            </Grid>
                            <Grid xs={12} xl={6} item marginY={1}>
                                <Typography fontWeight={600} marginBottom={1}>Số điện thoại</Typography>
                                <Box borderRadius={2} border="1px solid #dcdcdc" paddingX={2} paddingY={1}>
                                    <Typography>{post.owner?.phone}</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </SubCard>
            </Grid>
        </Grid>
    );
}

export default PostDetail;
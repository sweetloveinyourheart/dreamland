export enum ProjectType {
    KhuCanHo = "KhuCanHo",
    KhuDoThiMoi = 'KhuDoThiMoi'
}

export enum ProjectUtilities {
    TrungTamThuongMai = 'TrungTamThuongMai',
    KhuVuiChoiTreEm = 'KhuVuiChoiTreEm',
    KhuTheThao = 'KhuTheThao',
    SPA = 'SPA',
    HoBoi = 'HoBoi',
    PhongGYM = 'PhongGYM',
    BaiDauXe = 'BaiDauXe',
    Camera = 'Camera',
    BBQ = 'BBQ',
    BaoVe24 = 'BaoVe24',
    NhaThongMinh = 'hNhaThongMinh'
}

export function ProjectTypeTranslate(type: ProjectType) {
    switch (type) {
        case ProjectType.KhuCanHo:
            return "Khu Căn Hộ"
        case ProjectType.KhuDoThiMoi:
            return "Khu Đô Thị Mới"
        default:
            return ""
    }
}

export function ProjectUtilitiesTranslate(type: ProjectUtilities): string {
    switch (type) {
        case ProjectUtilities.BBQ:
            return "khu vực BBQ"

        case ProjectUtilities.BaiDauXe:
            return "Bãi đậu xe"

        case ProjectUtilities.BaoVe24:
            return "Bảo vệ 24/7"

        case ProjectUtilities.Camera:
            return "Camera an ninh"

        case ProjectUtilities.HoBoi:
            return "Bể bơi"

        case ProjectUtilities.KhuTheThao:
            return "Khu thể thao"

        case ProjectUtilities.KhuVuiChoiTreEm:
            return "Khu vui chơi trẻ em"

        case ProjectUtilities.NhaThongMinh:
            return "Nhà thông minh"

        case ProjectUtilities.PhongGYM:
            return "Phòng GYM"

        case ProjectUtilities.SPA:
            return "Spa"

        case ProjectUtilities.TrungTamThuongMai:
            return "Trung tâm thương mại"

        default:
            return "Khác"
    }
}
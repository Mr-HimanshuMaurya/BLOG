import{
    LuLayoutDashboard,
    LuGalleryVerticalEnd,
    LuMessageSquareQuote,
    LuLayoutTemplate,
    LuTag
} from "react-icons/lu";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SchoolIcon from '@mui/icons-material/School';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const SIDE_MENU_DATA = [
    {
        id:"01",
        label:"Dashboard",
        icon:LuLayoutDashboard,
        path:"/admin/dashboard",
    },

    {
        id:"02",
        label:"Blog Posts",
        icon: LuGalleryVerticalEnd,
        path: "/admin/posts",
    },
    {
        id:"03",
        label:"Comments",
        icon: LuMessageSquareQuote,
        path: "/admin/comments",   
    },
];

export const BLOG_NAVBAR_DATA = [
    {
        id:"01",
        label:"Home",
        icon: DashboardIcon,
        path: "/",
    },
    {
        id:"02",
        label:"Technology",
        icon: PrecisionManufacturingIcon,
        path: "/tag/Technology",
    },
    {
        id:"03",
        label:"Education",
        icon: SchoolIcon,
        path: "/tag/Education",
    },
    {
        id:"04",
        label:"AI Tech",
        icon:AutoAwesomeIcon,
        path:"/tag/AI"
    },
    {
        id:"05",
        label:"Create Post",
        icon: AddCircleOutlineIcon,
        path: "/user/create",
    },
]
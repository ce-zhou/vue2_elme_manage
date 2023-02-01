import Vue from "vue"
import {
    Form,
    FormItem,
    Input,
    Button,
    Message,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    MenuItem,
    Submenu,
    Avatar,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Table,
    TableColumn,
    Pagination,
    Dialog,
    Upload,
    Icon,
    MessageBox,
    Tooltip,
    Tag,
    RadioGroup,
    Radio,
    Cascader,
    Row,
    Col,
    Select,
    Option,
    Divider
} from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Container),
Vue.use(Main),
Vue.use(Aside)
Vue.use(Header)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Avatar)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Upload)
Vue.use(Icon)
Vue.use(Tooltip)
Vue.use(Tag)
Vue.use(RadioGroup),
Vue.use(Radio)
Vue.use(Cascader)
Vue.use(Row)
Vue.use(Col)
Vue.use(Select)
Vue.use(Option)
Vue.use(Divider)

Vue.prototype.$confirm = MessageBox
Vue.prototype.$message = Message
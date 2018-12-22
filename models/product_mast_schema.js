let mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Brand Schema
let prodSchema = mongoose.Schema({
    prdt_itemcode: {
        type: String,
    },
    prdt_subresscode: {
        type: String,
    },
    prdt_typ_name: {
        type: Schema.Types.ObjectId, ref: 'prdttyp_mast',
    },
    prdt_artwkdt: {
        type: String,
    },
    prdt_prtyname: {
        type: Schema.Types.ObjectId, ref: 'party_mast',
    },
    location_group: {
        type: Array,
    },
    pantone_group: {
        type: Array,
    },
    prdt_coinscratch:
    {
        type: String,
    },
    prdt_perfration:
    {
        type: String,
    },
    prdt_pname: {
        type: String,
    },
    prdt_brdqlty: {
        type: String,
    },
    prdt_gsmmb: {
        type: String,
    },
    actul_l: {
        type: String,
    },
    actul_w: {
        type: String,
    },
    actul_h: {
        type: String,
    },
    prdt_gsmtp: {
        type: String,
    },
    pad_l: {
        type: String,
    },
    pad_w: {
        type: String,
    },
    pad_h: {
        type: String,
    },
    prdt_lfcolor: {
        type: String,
    },
    prdt_fldingflat: {
        type: Schema.Types.ObjectId, ref: 'indsrttyp_mast',
    },
    prdt_fldingpttrn: {
        type: Schema.Types.ObjectId, ref: 'floading_mast',
    },
    foldng_l: {
        type: String,
    },
    foldng_w: {
        type: String,
    },
    foldng_h: {
        type: String,
    },
    prdt_vrtclhorzntlone: {
        type: String,
    },
    prdt_vrtclhorzntltwo: {
        type: String,
    },
    prdt_tkingszmm: {
        type: String,
    },
    prdt_erflp: {
        type: String,
    },
    prdt_dsignstyl: {
        type: Schema.Types.ObjectId, ref: 'design_mast',
    },
    prdt_country: {
        type: Schema.Types.ObjectId, ref: 'country_mast',
    },
    prdt_nvz: {
        type: String,
    },
    prdt_brdmnfctur: {
        type: Schema.Types.ObjectId, ref: 'manufactur_mast',
    },
    prdt_cnstrcton: {
        type: Schema.Types.ObjectId, ref: 'construction_mast',
    },
    prdt_embssrckno: {
        type: String,
    },
    prdt_lamination: {
        type: String,
    },
    prdt_laminationtyp: {
        type: String,
    },
    prdt_uv: {
        type: String,
    },
    prdt_vernish: {
        type: Schema.Types.ObjectId, ref: 'vernish_mast',
    },
    remark_group: {
        type: Array,
    },
    prdt_deprtmnt: {
        type: String,
    },
    filepath: {
        type: String,
        trim: true
    },
    filename: {
        type: String
    },
    ///Design Departmnt
    dsign_phrmacd: {
        type: String,
    },
    dsign_brcd: {
        type: String,
    },
    dsign_shetppsiz: {
        type: String,
    },
    dsign_uvblkt: {
        type: String,
    },
    dsign_ctsizone: {
        type: String,
    },
    dsign_ctsiztwo: {
        type: String,
    },
    dsign_cutinsrtone: {
        type: String,
    },
    dsign_cutinsrttwo: {
        type: String,
    },
    dsign_relsiz: {
        type: String,
    },
    dsign_ups: {
        type: String,
    },
    dsign_grain: {
        type: String,
    },
    dsign_dieno: {
        type: String,
    },
    design_michne: {
        type: Schema.Types.ObjectId, ref: 'machine_mast',
    },
    dsign_bralletyp: {
        type: String,
    },
    dsign_brallerckno: {
        type: String,
    },
    dsign_blnktno: {
        type: String,
    },
    dsign_grippr: {
        type: String,
    },
    ////Blanket Type
    blanket_name: {
        type: String,
    },
    blanketyp_ups: {
        type: String,
    },
    blanket_sizeone: {
        type: String,
    },
    blanket_sizetwo: {
        type: String,
    },
    blanket_in: {
        type: String,
    },
    ///Qc Departmnt
    qc_fileno: {
        type: String,
    },
    qc_cadesption: {
        type: String,
    },
    qc_coaconstrtion: {
        type: String,
    },
    qc_psting: {
        type: String,
    },
    qc_corbx: {
        type: String,
    },
    qc_size: {
        type: String,
    },
    qc_qty: {
        type: String,
    },
    qc_ups: {
        type: String,
    },
    co_code:{
        type:String,
    },
    div_code:{
        type:String,
    },
    usrnm:{
        type:String,
    }
});
let Product = module.exports = mongoose.model('product_mast', prodSchema);
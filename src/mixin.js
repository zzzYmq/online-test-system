export const mixin={
    data() {
        return {
            regNum:/1[34578][0-9]{9}$/,
            regName:/[\u4e00-\u9fa5]+/
        }
    },
   methods: {
    resetForm(FormName) {
        this.$refs[FormName].resetFields();
    },
    closeForm(FormName,DialogVisible){
        this.$refs[FormName].resetFields()
        this[DialogVisible]=false
    },
   },
}

export default {
       onIdle() {
           this.$store.dispatch("userStore/logoff",'');
           this.$router.push({name: 'Logoff'});
       },
}

const GetAccount = async()=>{
    try{
        const value = await window.ethereum.request({
        "method": "eth_accounts",
        "params": []});
        return value;
    }catch(e : any){
        console.log(e);
    }
}
export default GetAccount
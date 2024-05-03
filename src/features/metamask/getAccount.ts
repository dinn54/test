const GetAccount = async()=>{
    try{
        return await window.ethereum.request({
        "method": "eth_accounts",
        "params": []
    })}catch(e : any){
        console.log(e);
    }
}
export default GetAccount
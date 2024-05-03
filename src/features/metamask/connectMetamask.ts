const ConnectMetamask = async()=>{
    try{            
        await window.ethereum.request({
            "method": "eth_requestAccounts",
            "params": []})
    }catch(e: any){
        console.log(e)}        
}

export default ConnectMetamask
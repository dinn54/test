const DisconnectMetamask = async() =>{
    try{
        return await window.ethereum.request({
            "method": "wallet_revokePermissions",
            "params": [
                {"eth_accounts":{}}
            ]
        })

    }catch(e: any){
        console.log(e);
    }
}
export default DisconnectMetamask
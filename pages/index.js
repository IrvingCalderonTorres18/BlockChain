import Head from 'next/head'
import React from 'react';
import { loadData } from '../web3/funcs';
import styles from './index.module.css';
import Image from 'next/image';


export default function Home() {

  const [number, setNumber] = React.useState(null);
  const [contract, setContract] = React.useState(null);
  const [addressAccount, setAddressAccount] = React.useState(null);
  const [contractAddress, setContractAddress] = React.useState(null);

  const [inputValue, setInputValue] = React.useState('');

  const handleWeb3 = async () => 
  {
    const data = await loadData();

    setNumber(data.number);
    setContract(data.Contract_Web3_Conection);
    setAddressAccount(data.addressAccount);
    setContractAddress(data.Contract_Address);
  };

  const handleChangeNumber = async () => 
  {
    const data = await contract.methods.changeNumber(Number(inputValue)).encodeABI();

    const nonce = await web3.eth.getTransactionCount(addressAccount);

    const estimateGas = await contract.methods.changeNumber(Number(inputValue)).estimateGas({
      from: addressAccount,
      to: contractAddress,
      nonce: nonce,
      data: data
    });

    const params = {
      from: addressAccount,
      to: contractAddress,
      gas: web3.utils.toHex(estimateGas),
      gasPrice: web3.utils.toHex(web3.utils.toWei('50', 'gwei')),
      data: data
    };

    ethereum.request({
      method: 'eth_sendTransaction',
      params: [params]
    }).then((res) => 
    {
      console.log("Transaction Hash: ", res);

      const interval = setInterval(() => 
      {
        web3.eth.getTransactionReceipt(res, (err, rec) => 
        {
          if (rec)
          {
            handleWeb3();
            setInputValue('');
            clearInterval(interval);
          }
          
          if (err)
          {
            console.log('ERROR: ', err);
          }

        });
          
      }, 500);

    });

  };

  return (
    <>
        <div className={styles.background}>
      <Head>
        <title>Proyecto Los Prisioneros</title>
        <meta name="description" content="Simple web3 conection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

<nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
<div className={styles.logo}>
      <Image
        src="/LogoMetaMask.png"
        alt="Imagen descriptiva"
        width={40} // Ajusta el ancho según tus necesidades
        height={40} // Ajusta la altura según tus necesidades
      />
      </div>
  <div class="container-fluid">
    <a class="navbar-brand" href="#">LOS PRISIONEROS</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" href="/">Home</a>
        <a class="nav-link" href="https://etherscan.io/">EtherScan</a>
        <a class="nav-link" href="/">Contacto</a>
      </div>
    </div>
    
      <span class="navbar-text">
      Contratos inteligentes BNB Chain TestNet
      </span>
    </div>
</nav>

      <div className={styles.container}>
      <h1 className={`${styles.block} ${styles.white}`}>Block</h1>
      <h1 className={`${styles.chain} ${styles.blue}`}>Chain</h1>
    </div>

<div className={styles.cardcontainer}>
    <div className="card" style={{ width: '40rem' }}>
      <Image
        src="/Metamask.png"
        alt="Imagen descriptiva"
        width={500} // Ajusta el ancho según tus necesidades
        height={150} // Ajusta la altura según tus necesidades
        className="card-img-top"
      />
  <div class="card-body">
    <h5 class="card-title">Conexión a Web3</h5>
    <p class="card-text">Conecta tu cartera de metamask para la realización de tu contrato</p>
  </div>
  <ul class="list-group list-group-flush">
  <div className={styles.flex}>
  <button class="btn btn-primary" onClick={handleWeb3}>Conectar a MetaMask</button>
  </div>
  </ul>
  <ul class="list-group list-group-flush">
  <div class="card-body">
    <h5 class="card-title">El número es tuyo</h5>
    <p class="card-text">Si quieres que el número cambie puedes comprar el cambio</p>
  </div>
  </ul>

  <div className={styles.flex2}>
  <ul class="list-group list-group-flush">
  <h3>Número</h3>
  </ul>
  </div>

  <div className={styles.flexbasic}>
  <ul class="list-group list-group-flush">
  <h3>{number}</h3>
  </ul>
  </div>

  <div className={styles.flex3}>
  <ul class="list-group list-group-flush">
      <input type="number" value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)} placeholder="Escribe tu numero" className="form-control" />
      <button type="button" className="btn btn-primary" onClick={handleChangeNumber}>Cambia el numero</button>
      </ul>
    </div>
</div>
</div>

      </div>

    </>
  )
}

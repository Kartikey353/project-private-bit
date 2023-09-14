import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { useState, useContext, useEffect } from 'react';
import AccountContext from '../../context/accountContext';
import TokenContext from '../../context/Token/TokenContext';
import { toast } from 'react-hot-toast';

export default function Send(props) {
  const account = useContext(AccountContext);
  const token = useContext(TokenContext);
  const { onClose, open } = props;
  const [warningMessageOpen, setWarningMessageOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [statusType, setStatusType] = useState('error');
  const [recpAddr, setRecpAddr] = useState();
  const [amount, setAmount] = useState();

  const handleClose = () => {
    onClose(false);
  };

  useEffect(() => {
    // console.log("Triggered")
    const getBal = async () => {
      const bal = await account.getAccountBalance();
      // console.log(bal);
    };
    getBal();
  }, [token.isLoader]);

  const handleTransfer = () => {
    token.setIsLoader(true);
    setWarningMessageOpen(false);
    if (recpAddr === '') {
      setWarningMessageOpen(true);
      // setStatusType('error');
      // setStatus('Enter recipient address.');
      toast.error('Invalid Address');
    } else if (amount === '') {
      setWarningMessageOpen(true);
      // setStatusType('error');
      // setStatus('Enter value.');
      toast.error('Invalid Amount');
    } else
      account
        .transferMatic(recpAddr, amount)
        .then((res) => {
          console.log(res);
          setWarningMessageOpen(true);
          setRecpAddr('');
          setAmount('');
          toast.success('Transaction Success');
          token.setIsLoader(false);
        })
        .catch((err) => {
          console.log(err);
          // setWarningMessageOpen(true);
          // setStatusType('error');
          toast.error('Error! Try Again');
          // setStatus('Something went wrong. PLease try again.');
        });
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <DialogTitle> Transfer Matic </DialogTitle>{' '}
        <TextField
          id='addressFieldToTransferMatic'
          label="Recipients's Address"
          variant='outlined'
          value={recpAddr}
          onChange={(e) => setRecpAddr(e.target.value)}
        />{' '}
        <TextField
          id='valueFieldToTransferMatic'
          label='Value'
          value={amount}
          variant='outlined'
          onChange={(e) => setAmount(e.target.value)}
          sx={{ margin: '20px 0px 0px 0px' }}
        />{' '}
        {token.isLoader ? (
          <Button
            variant='contained'
            color='primary'
            sx={{ margin: '10px' }}
            disabled>
            <svg
              class='mr-3 h-5 w-5 animate-spin text-white'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'>
              <circle
                class='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'>
                {' '}
              </circle>{' '}
              <path
                class='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'>
                {' '}
              </path>{' '}
            </svg>{' '}
            <span class='font-medium text-white'> Sending... </span>{' '}
          </Button>
        ) : (
          <Button
            variant='contained'
            color='primary'
            sx={{ margin: '10px' }}
            onClick={handleTransfer}>
            Send{' '}
          </Button>
        )}{' '}
        {/* {warningMessageOpen && <Alert severity={statusType}> {status} </Alert>}{' '} */}{' '}
      </div>{' '}
    </Dialog>
  );
}

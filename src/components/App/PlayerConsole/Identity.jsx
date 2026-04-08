//src/components/PlayerConsole/Identity.jsx
import React, { useState, useEffect } from 'react'
import IdentityShape from '../../../assets/images/shape/identity-shape.png'
import editIcon from '../../../assets/images/icon/edit.png'
import checkIcon from '../../../assets/images/icon/check.png'
import { useAppKitAccount } from "@reown/appkit/react";
import { fetchPlayerByWallet, patchPlayerHandleByWallet } from "../../../services/player.api";


const Identity = ({ onUsernameSaved }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState('')
  const [tempUsername, setTempUsername] = useState(username)
  const { address } = useAppKitAccount();

  useEffect(() => {
    if (!address) return;

    fetchPlayerByWallet(address)
      .then((player) => {
        if (player?.handle) {
          setUsername(player.handle);
          setTempUsername(player.handle);
        }
      })
      .catch(() => {
        // silent fail is intentional here
      });
  }, [address]);


  const handleEdit = () => {
    setTempUsername(username)
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (!tempUsername || !address) return;

    try {
      await patchPlayerHandleByWallet(address, tempUsername);
      setUsername(tempUsername);
      setIsEditing(false);
      onUsernameSaved?.(tempUsername);
    } catch {
      // silently fail
    }
  };






  return (
    <div className="identity">
      <div className="custom-container">
        <div className="identity-inner">
          <div className="row">
            <div className="col-md-10">
              <div className="identity-left">
                <h2>IDENTITY</h2>
                <p>Player Handle</p>

                <h3>
                  {isEditing ? (
                    <input
                      value={tempUsername}
                      onChange={(e) => setTempUsername(e.target.value)}
                      autoFocus
                      style={{
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: 'inherit',
                        fontSize: 'inherit',
                        fontFamily: 'inherit',
                      }}
                    />
                  ) : (
                    username
                  )}

                  {!isEditing && (
                    <a href="#" onClick={(e) => { e.preventDefault(); handleEdit(); }}>
                      <img src={editIcon} alt="edit" />
                    </a>
                  )}

                  {isEditing && (
                    <a
                      href="#"
                      className="secondary-btn hover-btn lg done-btn"
                      onClick={(e) => { e.preventDefault(); handleSave(); }}
                    >
                      <img src={checkIcon} alt="save" />
                      <span className="btn-shape btn-shape1"></span>
                      <span className="btn-shape btn-shape2"></span>
                      <span className="btn-shape btn-shape3"></span>
                      <span className="btn-shape btn-shape4"></span>
                    </a>
                  )}
                </h3>
              </div>
            </div>

            <div className="col-md-2">
              <div className="identity-right">
                <img src={IdentityShape} alt="img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Identity

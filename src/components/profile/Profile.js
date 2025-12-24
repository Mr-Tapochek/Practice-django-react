import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./profile.scss";

const Profile = () => {
    const [profile, setProfile] = useState({ bio: '', avatar_url: '', banner_url: '', nickname: '' });
    const [editing, setEditing] = useState(false);
    const [newAvatar, setNewAvatar] = useState(null);
    const [newBanner, setNewBanner] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        axios.get('http://127.0.0.1:8000/profile/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setProfile({
                    bio: response.data.profile?.bio || '',
                    avatar_url: response.data.profile?.avatar_url,
                    banner_url: response.data.profile?.banner_url,
                    nickname: response.data.nickname || 'Пользователь'
                });
            })
            .catch(error => {
                console.error('Ошибка при загрузке профиля:', error);
            });
    }, []);

    const handleAvatarChange = e => {
        if (e.target.files[0]) {
            setNewAvatar(e.target.files[0]);
            const previewUrl = URL.createObjectURL(e.target.files[0]);
            setProfile(prev => ({
                ...prev,
                avatar_url: previewUrl
            }));
        }
    };

    const handleBannerChange = e => {
        if (e.target.files[0]) {
            setNewBanner(e.target.files[0]);
            const previewUrl = URL.createObjectURL(e.target.files[0]);
            setProfile(prev => ({
                ...prev,
                banner_url: previewUrl
            }));
        }
    };

    const applyChanges = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const formData = new FormData();

            if (newAvatar) {
                formData.append('avatar', newAvatar);
            }
            if (newBanner) {
                formData.append('banner', newBanner);
            }
            if (profile.bio) {
                formData.append('bio', profile.bio);
            }

            await axios.put('http://127.0.0.1:8000/profile/', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setNewAvatar(null);
            setNewBanner(null);
            setEditing(false);
            alert('Профиль обновлен');
        } catch (err) {
            console.error("Ошибка при сохранении изменений:", err);
            alert('Ошибка при сохранении');
        }
    };

    return (
        <div className="profile-container">
            <div className="banner-section">
                {profile.banner_url ? (
                    <img src={profile.banner_url} alt="Баннер" className="banner-image" />
                ) : (
                    <div className="banner-placeholder">Баннер не установлен</div>
                )}

                {editing && (
                    <label className="edit-banner-btn">
                        ✏️
                        <input type="file" accept="image/*" onChange={handleBannerChange} style={{ display: 'none' }} />
                    </label>
                )}
            </div>

            <div className="avatar-section">
                <div className="avatar-wrapper">
                    {profile.avatar_url ? (
                        <img src={profile.avatar_url} alt="Аватар" className="avatar-image" />
                    ) : (
                        <div className="avatar-placeholder">Аватар</div>
                    )}

                    {editing && (
                        <label className="edit-avatar-btn">
                            ✏️
                            <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
                        </label>
                    )}
                </div>

                <h2 className="nickname">{profile.nickname}</h2>
            </div>

            <div className="bio-section">
                <h3>О себе:</h3>
                {editing ? (
                    <textarea
                        value={profile.bio || ''}
                        onChange={(e) => setProfile(prev => ({
                            ...prev,
                            bio: e.target.value
                        }))} rows="4" className="bio-textarea" placeholder="Расскажите о себе..." />
                ) : (
                    <p className="bio-text"> {profile.bio || 'Нет информации о себе'} </p>
                )}
            </div>

            <div className="controls-section">
                {editing ? (
                    <div className="edit-controls">
                        <button onClick={applyChanges} className="apply-btn" >  Применить </button>
                        <button
                            onClick={() => {
                                setEditing(false);
                                setNewAvatar(null);
                                setNewBanner(null);

                                const token = localStorage.getItem('access_token');
                                axios.get('http://127.0.0.1:8000/profile/', {
                                    headers: { 'Authorization': `Bearer ${token}` }
                                })
                                    .then(response => {
                                        setProfile({
                                            bio: response.data.profile?.bio || '',
                                            avatar_url: response.data.profile?.avatar_url,
                                            banner_url: response.data.profile?.banner_url,
                                            nickname: response.data.nickname || 'Пользователь'
                                        });
                                    });
                            }} className="cancel-btn" > Отмена </button>
                    </div>
                ) : (
                    <button onClick={() => setEditing(true)} className="edit-btn">Изменить профиль</button>
                )}
            </div>

            {editing && (newAvatar || newBanner) && (
                <div className="files-info">
                    {newAvatar && <p>Новый аватар: {newAvatar.name}</p>}
                    {newBanner && <p>Новый баннер: {newBanner.name}</p>}
                </div>
            )}
        </div>
    );
};

export default Profile;
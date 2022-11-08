import React from 'react';

export const Success = ({onClickSuccess, count }) => {
  return (
    <div className="success-block">
      <img src="/assets/success.svg" alt="Success" />
      <h3>Успешно!</h3>
      <p>Всем {count} пользователям отправлено приглашение.</p>
      <button className="send-invite-btn"><a style={{ textDecoration: 'none', color: 'white' }} href='/'>Назад</a></button>
      {/* onClick={onClickSuccess} */}
    </div>
  );
};

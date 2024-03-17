export default {
  translation: {
    pages: {
      name: 'Hexlet Chat',
      channelsTitle: 'Каналы',
      pageNotFound: 'Страница не найдена',
      redirect: 'Но вы можете перейти ',
      mainPage: 'на главную страницу',
    },

    buttons: {
      enter: 'Войти',
      exit: 'Выйти',
      makeRegistration: 'Зарегистрироваться',
      send: 'Отправить',
      cancel: 'Отменить',
      plus: '+',
    },

    ui: {
      exist: 'Уже есть аккаунт? ',
      updatePage: 'Обновить страницу',
      loading: 'Идет загрузка...',
      registration: 'Регистрация',
      noAccount: 'Нет аккаунта?',
      newMessage: 'Новое сообщение',
    },

    regRules: {
      name: 'От 3 до 20 символов',
      password: 'Не менее 6 символов',
      passwordEquality: 'Пароли должны совпадать',
    },

    placeholders: {
      login: 'Ваш ник',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      newMessage: 'Введите сообщение...',
    },

    messagesCounter: {
      messages_zero: 'Нет сообщений',
      messages_one: '{{count}} сообщение',
      messages_few: '{{count}} сообщения',
      messages_many: '{{count}} сообщений',
    },

    modal: {
      add: 'Добавить канал',
      toggle: 'Управление каналом',
      rename: 'Переименовать',
      renameChannel: 'Переименовать канал',
      remove: 'Удалить',
      removeChannel: 'Удалить канал',
      channelName: 'Имя канала',
      confirm: 'Уверены?',
      unique: 'Должно быть уникальным',
      lengthParams: 'От 3 до 20 символов',
    },

    success: {
      newChannel: 'Канал создан',
      removeChannel: 'Канал удалён',
      renameChannel: 'Канал переименован',
    },

    errors: {
      invalidFeedback: 'Неверные имя пользователя или пароль',
      userExist: 'Такой пользователь уже существует',
      network: 'Ошибка соединения',
      message: 'Ошибка добавления сообщения',
      channelAdd: 'Ошибка добавления канала',
      channelRemove: 'Ошибка удаления канала',
      channelRename: 'Ошибка переименования канала',
      minLetter: 'Не менее 6 символов',
      unknown: 'Что-то пошло не так',
      unauthorized: 'Произошла ошибка при загрузке данных',
      required: 'Обязательное поле',
      messageBody: 'Сообщение не может быть пустым',
    },
  },
};

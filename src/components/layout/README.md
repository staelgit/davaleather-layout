# Layout Component

Базовый шаблон для всех страниц сайта.

## Использование

### Главная страница

```handlebars
{{>layout title="Dava leather" page="main"}}
```

### Страница About

```handlebars
{{>layout title="О компании" page="about"}}
```

### Страница Services

```handlebars
{{>layout title="Our Services - Dava Leather" page="services"}}
```

### Создание новой страницы

1. Создайте HTML файл страницы:

```handlebars
{{>layout title="Заголовок страницы" page="your-page"}}
```

2. Добавьте контент в `src/components/layout/content.html`:

```handlebars
{{#if (eq page 'your-page')}}
  <div class='container'>
    <h1>Ваш контент</h1>
    <p>Описание страницы...</p>
  </div>
{{/if}}
```

## Доступные параметры

- `title` - заголовок страницы (обязательный)
- `page` - идентификатор страницы для определения контента (обязательный)

## Структура шаблона

Базовый шаблон включает:

- HTML5 структуру
- Мета-теги и подключение шрифтов
- Header компонент
- Main секцию для контента (заполняется через {{>content}})
- Contacts и Footer компоненты
- Основной JavaScript файл

## Поддерживаемые страницы

- `main` - главная страница
- `about` - страница About
- `price` - страница Price

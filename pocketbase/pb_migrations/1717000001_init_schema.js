/// <reference path="../pb_data/types.d.ts" />

// Initial schema for the d4m13n.dev portfolio: tags, posts, projects and
// contact_messages. Written against the PocketBase v0.22 migration API
// (Dao / schema / options), matching the pinned binary in the Dockerfile.

migrate(
  (db) => {
    const dao = new Dao(db);

    // ---- tags ----
    const tags = new Collection({
      name: 'tags',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: null,
      updateRule: null,
      deleteRule: null,
      schema: [
        { name: 'name', type: 'text', required: true, options: {} },
        { name: 'slug', type: 'text', required: true, options: {} },
      ],
      indexes: ['CREATE UNIQUE INDEX `idx_tags_slug` ON `tags` (`slug`)'],
    });
    dao.saveCollection(tags);

    // ---- posts ----
    const posts = new Collection({
      name: 'posts',
      type: 'base',
      // Only published posts are exposed through the public API.
      listRule: 'published = true',
      viewRule: 'published = true',
      createRule: null,
      updateRule: null,
      deleteRule: null,
      schema: [
        { name: 'title', type: 'text', required: true, options: {} },
        { name: 'slug', type: 'text', required: true, options: {} },
        { name: 'excerpt', type: 'text', required: false, options: { max: 500 } },
        { name: 'content', type: 'text', required: false, options: {} },
        {
          name: 'cover',
          type: 'file',
          required: false,
          options: {
            maxSelect: 1,
            maxSize: 5242880,
            mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
            thumbs: ['600x340', '1200x630'],
          },
        },
        { name: 'published', type: 'bool', required: false, options: {} },
        { name: 'published_at', type: 'date', required: false, options: {} },
        { name: 'reading_minutes', type: 'number', required: false, options: { min: 0 } },
        {
          name: 'tags',
          type: 'relation',
          required: false,
          options: {
            collectionId: tags.id,
            cascadeDelete: false,
            minSelect: 0,
            maxSelect: 20,
            displayFields: ['name'],
          },
        },
      ],
      indexes: ['CREATE UNIQUE INDEX `idx_posts_slug` ON `posts` (`slug`)'],
    });
    dao.saveCollection(posts);

    // ---- projects ----
    const projects = new Collection({
      name: 'projects',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: null,
      updateRule: null,
      deleteRule: null,
      schema: [
        { name: 'title', type: 'text', required: true, options: {} },
        { name: 'slug', type: 'text', required: true, options: {} },
        { name: 'description', type: 'text', required: false, options: {} },
        { name: 'technologies', type: 'json', required: false, options: { maxSize: 20000 } },
        {
          name: 'category',
          type: 'select',
          required: false,
          options: { maxSelect: 1, values: ['software', 'game', 'oss'] },
        },
        { name: 'repo_url', type: 'url', required: false, options: {} },
        { name: 'demo_url', type: 'url', required: false, options: {} },
        {
          name: 'cover',
          type: 'file',
          required: false,
          options: {
            maxSelect: 1,
            maxSize: 5242880,
            mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
            thumbs: ['600x340'],
          },
        },
        { name: 'featured', type: 'bool', required: false, options: {} },
        { name: 'sort', type: 'number', required: false, options: {} },
      ],
      indexes: ['CREATE UNIQUE INDEX `idx_projects_slug` ON `projects` (`slug`)'],
    });
    dao.saveCollection(projects);

    // ---- contact_messages ----
    // Anyone may submit; only authenticated superusers can read/manage.
    const contact = new Collection({
      name: 'contact_messages',
      type: 'base',
      listRule: null,
      viewRule: null,
      createRule: '',
      updateRule: null,
      deleteRule: null,
      schema: [
        { name: 'name', type: 'text', required: true, options: {} },
        { name: 'email', type: 'email', required: true, options: {} },
        { name: 'message', type: 'text', required: true, options: { max: 5000 } },
      ],
    });
    dao.saveCollection(contact);
  },
  (db) => {
    const dao = new Dao(db);
    for (const name of ['contact_messages', 'projects', 'posts', 'tags']) {
      try {
        dao.deleteCollection(dao.findCollectionByNameOrId(name));
      } catch (_) {
        // collection may not exist; ignore on rollback
      }
    }
  },
);

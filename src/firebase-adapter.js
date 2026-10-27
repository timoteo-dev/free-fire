import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyD3jMu6Yu1zbC1l2PLfQv9XkU1FW8BipK4",
  authDomain: "free-fire-86b99.firebaseapp.com",
  projectId: "free-fire-86b99",
  storageBucket: "free-fire-86b99.firebasestorage.app",
  messagingSenderId: "459524141749",
  appId: "1:459524141749:web:fd0c25d36f12be556404fc",
  measurementId: "G-DHLJVTHDQ1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class SupabaseToFirestoreQuery {
  constructor(db, tableName) {
    this.db = db;
    this.tableName = tableName;
    this.conditions = [];
    this.orderings = [];
    this.limitCount = null;
    this.isSingle = false;
    this.operation = "select";
    this.payload = null;
  }

  select(fields = "*") {
    this.operation = "select";
    return this;
  }

  eq(field, value) {
    this.conditions.push({ field, op: "==", value });
    return this;
  }

  neq(field, value) {
    this.conditions.push({ field, op: "!=", value });
    return this;
  }

  gt(field, value) {
    this.conditions.push({ field, op: ">", value });
    return this;
  }

  gte(field, value) {
    this.conditions.push({ field, op: ">=", value });
    return this;
  }

  lt(field, value) {
    this.conditions.push({ field, op: "<", value });
    return this;
  }

  lte(field, value) {
    this.conditions.push({ field, op: "<=", value });
    return this;
  }

  in(field, values) {
    if (Array.isArray(values) && values.length > 0) {
      this.conditions.push({ field, op: "in", value: values.slice(0, 10) });
    }
    return this;
  }

  order(field, opts = { ascending: true }) {
    this.orderings.push({ field, dir: opts?.ascending ? "asc" : "desc" });
    return this;
  }

  limit(count) {
    this.limitCount = count;
    return this;
  }

  maybeSingle() {
    this.isSingle = true;
    return this;
  }

  single() {
    this.isSingle = true;
    return this;
  }

  insert(data) {
    this.operation = "insert";
    this.payload = data;
    return this;
  }

  upsert(data) {
    this.operation = "upsert";
    this.payload = data;
    return this;
  }

  update(data) {
    this.operation = "update";
    this.payload = data;
    return this;
  }

  delete() {
    this.operation = "delete";
    return this;
  }

  async execute() {
    // Subscriptions: always return PRO
    if (this.tableName === "subscriptions" && this.operation === "select") {
      const mockSub = {
        id: "sub-pro-lifetime",
        status: "ativo",
        plano: "PRO",
        data_fim: "2099-12-31T23:59:59.999Z",
        created_at: new Date().toISOString()
      };
      return { data: this.isSingle ? mockSub : [mockSub], error: null };
    }

    // Perfis: always return Admin Pro
    if (this.tableName === "perfis" && this.operation === "select") {
      const mockPerfil = {
        id: "guest-user-123",
        is_admin: true,
        rotas_ativo: true,
        campeonatos_ativo: true,
        trial_expires_at: null
      };
      return { data: this.isSingle ? mockPerfil : [mockPerfil], error: null };
    }

    const colRef = collection(this.db, this.tableName);

    try {
      if (this.operation === "insert" || this.operation === "upsert") {
        const items = Array.isArray(this.payload) ? this.payload : [this.payload];
        const results = [];
        for (const item of items) {
          const cleanItem = { ...item };
          const docId = cleanItem.id ? String(cleanItem.id) : String(Date.now() + Math.random().toString(36).substring(2, 8));
          cleanItem.id = docId;
          cleanItem.created_at = cleanItem.created_at || new Date().toISOString();
          cleanItem.updated_at = new Date().toISOString();
          const docRef = doc(this.db, this.tableName, docId);
          await setDoc(docRef, cleanItem, { merge: true });
          results.push(cleanItem);
        }
        return { data: Array.isArray(this.payload) ? results : results[0], error: null };
      }

      if (this.operation === "update") {
        let q = colRef;
        const queryConstraints = [];
        for (const c of this.conditions) {
          queryConstraints.push(where(c.field, c.op, c.value));
        }
        if (queryConstraints.length > 0) {
          q = query(colRef, ...queryConstraints);
        }
        const snap = await getDocs(q);
        const updates = [];
        for (const d of snap.docs) {
          const docRef = doc(this.db, this.tableName, d.id);
          const updateData = { ...this.payload, updated_at: new Date().toISOString() };
          await updateDoc(docRef, updateData);
          updates.push({ id: d.id, ...d.data(), ...updateData });
        }
        return { data: updates, error: null };
      }

      if (this.operation === "delete") {
        let q = colRef;
        const queryConstraints = [];
        for (const c of this.conditions) {
          queryConstraints.push(where(c.field, c.op, c.value));
        }
        if (queryConstraints.length > 0) {
          q = query(colRef, ...queryConstraints);
        }
        const snap = await getDocs(q);
        for (const d of snap.docs) {
          const docRef = doc(this.db, this.tableName, d.id);
          await deleteDoc(docRef);
        }
        return { data: null, error: null };
      }

      // SELECT
      let constraints = [];
      for (const c of this.conditions) {
        constraints.push(where(c.field, c.op, c.value));
      }
      for (const o of this.orderings) {
        constraints.push(orderBy(o.field, o.dir));
      }
      if (this.limitCount) {
        constraints.push(limit(this.limitCount));
      }

      let snap;
      try {
        const q = constraints.length > 0 ? query(colRef, ...constraints) : colRef;
        snap = await getDocs(q);
      } catch (err) {
        // Fallback if composite index missing in Firestore
        const fallbackConstraints = this.conditions.map(c => where(c.field, c.op, c.value));
        const qFallback = fallbackConstraints.length > 0 ? query(colRef, ...fallbackConstraints) : colRef;
        snap = await getDocs(qFallback);
      }

      const rows = snap.docs.map(d => ({ id: d.id, ...d.data() }));

      if (this.isSingle) {
        return { data: rows.length > 0 ? rows[0] : null, error: null };
      }
      return { data: rows, error: null };
    } catch (error) {
      console.error(`[Firebase Firestore] Error in table ${this.tableName}:`, error);
      return { data: [], error: null };
    }
  }

  then(onFulfilled, onRejected) {
    return this.execute().then(onFulfilled, onRejected);
  }
}

export class FirebaseClient {
  constructor(app, db) {
    this.app = app;
    this.db = db;
    this.auth = {
      getSession: async () => ({
        data: {
          session: {
            user: {
              id: "guest-user-123",
              email: "analista@freefire.com",
              user_metadata: { name: "Analista Free Fire" }
            }
          }
        },
        error: null
      }),
      onAuthStateChange: (cb) => {
        cb("SIGNED_IN", {
          user: {
            id: "guest-user-123",
            email: "analista@freefire.com",
            user_metadata: { name: "Analista Free Fire" }
          }
        });
        return {
          data: {
            subscription: {
              unsubscribe: () => {}
            }
          }
        };
      },
      signOut: async () => {},
      signInWithPassword: async () => ({ data: { user: { id: "guest-user-123" } }, error: null }),
      signUp: async () => ({ data: { user: { id: "guest-user-123" } }, error: null }),
      resetPasswordForEmail: async () => ({ data: {}, error: null })
    };
    this.storage = {
      from: (bucket) => ({
        upload: async (path, file) => {
          return { data: { path }, error: null };
        },
        getPublicUrl: (path) => ({
          data: { publicUrl: path.startsWith("http") ? path : `/uploads/${path}` }
        })
      })
    };
    this.functions = {
      invoke: async (fnName, opts) => {
        return { data: {}, error: null };
      }
    };
  }

  from(tableName) {
    return new SupabaseToFirestoreQuery(this.db, tableName);
  }
}

export const firebaseClient = new FirebaseClient(app, db);
window.__FIREBASE_CLIENT__ = firebaseClient;
export default firebaseClient;

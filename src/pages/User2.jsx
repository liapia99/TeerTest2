import { db } from "../firebase";
import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc
} from "firebase/firestore";
import "./Request.css";

function User() {
  const [profiles, setProfiles] = useState([]);
  const [form, setForm] = useState({
    title: "",
    desc: "",
    contact: "",
    users: [],
    accounts: []
  });
  const [popupActive, setPopupActive] = useState(false);

  const profilesCollectionRef = collection(db, "profiles");

  useEffect(() => {
    onSnapshot(profilesCollectionRef, (snapshot) => {
      setProfiles(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            viewing: false,
            ...doc.data()
          };
        })
      );
    });
  }, []);

  const handleView = (id) => {
    const profilesClone = [...profiles];

    profilesClone.forEach((profile) => {
      if (profile.id === id) {
        profile.viewing = !profile.viewing;
      } else {
        profile.viewing = false;
      }
    });

    setProfiles(profilesClone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.desc ||
      !form.contact ||
      !form.users ||
      !form.accounts
    ) {
      alert("Please fill out all fields");
      return;
    }

    addDoc(profilesCollectionRef, form);

    setForm({
      title: "",
      desc: "",
      contact: "",
      users: [],
      accounts: []
    });

    setPopupActive(false);
  };

  const handleUser = (e, i) => {
    const usersClone = [...form.users];

    usersClone[i] = e.target.value;

    setForm({
      ...form,
      users: usersClone
    });
  };

  const handleAccount = (e, i) => {
    const accountsClone = [...form.accounts];

    accountsClone[i] = e.target.value;

    setForm({
      ...form,
      accounts: accountsClone
    });
  };

  const handleUserCount = () => {
    setForm({
      ...form,
      users: [...form.users, ""]
    });
  };

  const handleAccountCount = () => {
    setForm({
      ...form,
      accounts: [...form.accounts, ""]
    });
  };

  const removeProfile = (id) => {
    deleteDoc(doc(db, "profiles", id));
  };

  return (
    <div className="User">
      <div className="profiles">
        {profiles.map((profile, i) => (
          <div className="profile" key={profile.id}>
            <h3>{profile.title}</h3>

            <p dangerouslySetInnerHTML={{ __html: profile.desc }}></p>
            <p dangerouslySetInnerHTML={{ __html: profile.contact }}></p>
            {profile.viewing && (
              <div>
                <h4>Day(s) and Time of Operation</h4>
                <ul>
                  {profile.users.map((user, i) => (
                    <li key={i}>{user}</li>
                  ))}
                </ul>

                <h4>Skills Recommended</h4>
                <ol>
                  {profile.accounts.map((account, i) => (
                    <li key={i}>{account}</li>
                  ))}
                </ol>
              </div>
            )}

            <div className="buttons">
              <button onClick={() => handleView(profile.id)}>
                View {profile.viewing ? "less" : "more"}
              </button>
              <button
                className="remove"
                onClick={() => removeProfile(profile.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {popupActive && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Add a new request</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label> Request Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  type="text"
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Contact</label>
                <textarea
                  type="text"
                  value={form.contact}
                  onChange={(e) =>
                    setForm({ ...form, contact: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Day(s) and Time of Operation</label>
                {form.users.map((user, i) => (
                  <input
                    type="text"
                    key={i}
                    value={user}
                    onChange={(e) => handleUser(e, i)}
                  />
                ))}
                <button type="button" onClick={handleUserCount}>
                  Add a date and time
                </button>
              </div>

              <div className="form-group">
                <label>Skills Recommended</label>
                {form.accounts.map((account, i) => (
                  <textarea
                    type="text"
                    key={i}
                    value={account}
                    onChange={(e) => handleAccount(e, i)}
                  />
                ))}
                <button type="button" onClick={handleAccountCount}>
                  Add skill
                </button>
              </div>

              <div className="buttons">
                <button type="submit">Submit</button>
                <button
                  type="button"
                  class="remove"
                  onClick={() => setPopupActive(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;

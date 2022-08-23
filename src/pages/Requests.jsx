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

function Requests() {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({
    title: "",
    desc: "",
    contact: "",

    ingredients: [],
    steps: []
  });
  const [popupActive, setPopupActive] = useState(false);

  const recipesCollectionRef = collection(db, "recipes");

  useEffect(() => {
    onSnapshot(recipesCollectionRef, (snapshot) => {
      setRecipes(
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
    const recipesClone = [...recipes];

    recipesClone.forEach((recipe) => {
      if (recipe.id === id) {
        recipe.viewing = !recipe.viewing;
      } else {
        recipe.viewing = false;
      }
    });

    setRecipes(recipesClone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.desc ||
      !form.contact ||
      !form.ingredients ||
      !form.steps
    ) {
      alert("Please fill out all fields");
      return;
    }

    addDoc(recipesCollectionRef, form);

    setForm({
      title: "",
      desc: "",
      contact: "",
      ingredients: [],
      steps: []
    });

    setPopupActive(false);
  };

  const handleIngredient = (e, i) => {
    const ingredientsClone = [...form.ingredients];

    ingredientsClone[i] = e.target.value;

    setForm({
      ...form,
      ingredients: ingredientsClone
    });
  };

  const handleStep = (e, i) => {
    const stepsClone = [...form.steps];

    stepsClone[i] = e.target.value;

    setForm({
      ...form,
      steps: stepsClone
    });
  };

  const handleIngredientCount = () => {
    setForm({
      ...form,
      ingredients: [...form.ingredients, ""]
    });
  };

  const handleStepCount = () => {
    setForm({
      ...form,
      steps: [...form.steps, ""]
    });
  };

  const removeRecipe = (id) => {
    deleteDoc(doc(db, "recipes", id));
  };

  return (
    <div className="App">
      <h1>Requests</h1>

      <button onClick={() => setPopupActive(!popupActive)}>Add request</button>

      <div className="recipes">
        {recipes.map((recipe, i) => (
          <div className="recipe" key={recipe.id}>
            <h3>{recipe.title}</h3>

            <p dangerouslySetInnerHTML={{ __html: recipe.desc }}></p>
            <p dangerouslySetInnerHTML={{ __html: recipe.contact }}></p>
            {recipe.viewing && (
              <div>
                <h4>Day(s) and Time of Operation</h4>
                <ul>
                  {recipe.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>

                <h4>Skills Recommended</h4>
                <ol>
                  {recipe.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            )}

            <div className="buttons">
              <button onClick={() => handleView(recipe.id)}>
                View {recipe.viewing ? "less" : "more"}
              </button>
              <button
                className="remove"
                onClick={() => removeRecipe(recipe.id)}
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
                {form.ingredients.map((ingredient, i) => (
                  <input
                    type="text"
                    key={i}
                    value={ingredient}
                    onChange={(e) => handleIngredient(e, i)}
                  />
                ))}
                <button type="button" onClick={handleIngredientCount}>
                  Add a date and time
                </button>
              </div>

              <div className="form-group">
                <label>Skills Recommended</label>
                {form.steps.map((step, i) => (
                  <textarea
                    type="text"
                    key={i}
                    value={step}
                    onChange={(e) => handleStep(e, i)}
                  />
                ))}
                <button type="button" onClick={handleStepCount}>
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

export default Requests;

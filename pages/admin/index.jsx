import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('tours');
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Editing states
  const [editingItem, setEditingItem] = useState(null);
  const [editorText, setEditorText] = useState("");

  useEffect(() => {
    const savedAuth = localStorage.getItem('humsafar_admin_auth');
    if (savedAuth) {
      setPassword(savedAuth);
      fetchData(savedAuth);
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const fetchData = async (pass) => {
    setLoading(true);
    try {
      const res = await fetch('/api/cms', {
        headers: { Authorization: `Bearer ${pass}` }
      });
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setIsAuthenticated(true);
        localStorage.setItem('humsafar_admin_auth', pass);
      } else {
        if (isAuthenticated) showToast("Session expired. Please login again.");
        setIsAuthenticated(false);
        localStorage.removeItem('humsafar_admin_auth');
      }
    } catch (err) {
      console.error(err);
      if (isAuthenticated) showToast("Error connecting to server.");
    }
    setLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetchData(password);
  };

  const handleSave = async (updatedData = data) => {
    setSaving(true);
    try {
      const res = await fetch('/api/cms', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${password}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        setData(updatedData);
        showToast('✅ Saved successfully!');
        setEditingItem(null);
      } else {
        showToast('❌ Failed to save.');
      }
    } catch (err) {
      showToast('❌ Error saving data.');
    }
    setSaving(false);
  };

  // ----- Login Screen -----
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <Head><title>Admin Login - Humsafar</title></Head>
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl w-full max-w-md border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 font-serif">Humsafar CMS</h1>
            <p className="text-emerald-400 text-sm">Authorized personnel only</p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="text-slate-300 text-xs font-bold uppercase tracking-wider">Access Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Enter password..."
                autoFocus
                required
              />
            </div>
            <button
              disabled={loading}
              className="mt-4 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Enter Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- Helpers for CRUD ---
  const handleAddNew = () => {
    if (activeTab === 'tours') {
      const newTour = {
        _id: `t${Date.now()}`, title: "New Tour Package", slug: `new-tour-${Date.now()}`,
        location: "Location", region: "other", type: "group", duration: "1 Day", price: 1000,
        img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        highlights: [], inclusions: [], exclusions: [], itinerary: [], faqs: []
      };
      setEditingItem(newTour);
    } else if (activeTab === 'blogs') {
      const newBlog = {
        id: `blog${Date.now()}`, title: "New Blog Post", slug: `new-blog-${Date.now()}`,
        content: [], coverImage: ""
      };
      setEditingItem(newBlog);
    } else if (activeTab === 'banners') {
      const newBanner = {
        id: `b${Date.now()}`, url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        title: "New Banner", tag: "Tag", hi: "Highlight", sub: "Subtitle"
      };
      setEditingItem(newBanner);
    }
  };

  const handleDelete = (id) => {
    if(!window.confirm("Are you sure you want to delete this?")) return;
    const key = activeTab.toUpperCase();
    const updatedArray = data[key].filter(item => (item._id || item.id) !== id);
    const updatedData = { ...data, [key]: updatedArray };
    handleSave(updatedData);
  };

  const handleUpdateItem = () => {
    const key = activeTab.toUpperCase();
    let updatedArray = [...data[key]];
    const index = updatedArray.findIndex(item => (item._id || item.id) === (editingItem._id || editingItem.id));
    if (index >= 0) {
      updatedArray[index] = editingItem;
    } else {
      updatedArray.push(editingItem); // New item
    }
    const updatedData = { ...data, [key]: updatedArray };
    handleSave(updatedData);
  };

  // ----- Render Main Dashboard -----
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Head><title>Admin - Humsafar</title></Head>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 border border-slate-700 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col fixed h-full shadow-xl z-20">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-2xl font-serif font-bold text-white tracking-wide">Humsafar<span className="text-emerald-400">CMS</span></h2>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest px-1">Admin Panel</p>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          {['tours', 'blogs', 'banners', 'site'].map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setEditingItem(null); setEditorText(""); }}
              className={`text-left px-5 py-3 rounded-xl transition-all font-medium flex items-center justify-between group ${activeTab === tab ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <span className="capitalize">{tab}</span>
              {activeTab === tab && <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => {
              setIsAuthenticated(false);
              localStorage.removeItem('humsafar_admin_auth');
            }}
            className="w-full text-left px-5 py-3 rounded-xl text-red-400 hover:bg-red-500/10 font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="ml-64 flex-1 p-8 lg:p-12 pb-32">
        {editingItem ? (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 font-serif">
                Edit {activeTab.slice(0, -1)}
              </h2>
              <div className="flex gap-3">
                <button onClick={() => setEditingItem(null)} className="px-5 py-2 text-slate-500 hover:bg-slate-100 rounded-xl font-medium transition-colors">
                  Cancel
                </button>
                <button 
                  onClick={handleUpdateItem} 
                  disabled={saving}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md disabled:opacity-50 transition-all"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>

            {/* Dynamic Basic Fields Form + Advanced JSON at the bottom */}
            <div className="mb-6 flex flex-col xl:flex-row gap-8">
              
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4">Basic Details</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(editingItem).map(key => {
                    const value = editingItem[key];
                    if (typeof value === 'object' || key === '_id' || key === 'id') return null; // handled via JSON or disabled
                    return (
                      <div key={key}>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">
                          {key}
                        </label>
                        <input
                          type={typeof value === 'number' ? 'number' : 'text'}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl px-4 py-2.5 text-slate-700 font-medium transition-all"
                          value={value || ''}
                          onChange={(e) => {
                            const val = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
                            const newItem = { ...editingItem, [key]: val };
                            setEditingItem(newItem);
                            setEditorText(JSON.stringify(newItem, null, 2));
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Image Preview */}
              {(editingItem.img || editingItem.url || editingItem.coverImage) && (
                <div className="w-full xl:w-72 shrink-0">
                   <p className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4">Preview</p>
                  <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 shadow-xl border border-slate-200">
                    <img src={editingItem.img || editingItem.url || editingItem.coverImage} className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
            </div>

            {/* Advanced Section for Arrays/Nested Object */}
            <div className="mt-8 border-t border-slate-100 pt-8">
              <p className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-2 flex items-center gap-2">
                <span>Advanced Details & Content</span>
                <span className="bg-yellow-100 text-yellow-800 text-[10px] px-2 py-0.5 rounded-full">JSON Editor</span>
              </p>
              <p className="text-xs text-slate-500 mb-4 px-1">
                Use this advanced editor to modify nested itineraries, highlights arrays, and deeply structured content.
              </p>
              <textarea
                className="w-full h-96 p-5 bg-slate-900 border border-slate-800 text-emerald-400 font-mono text-sm rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                value={editorText || JSON.stringify(editingItem, null, 2)}
                onChange={(e) => {
                  setEditorText(e.target.value);
                  try {
                    setEditingItem(JSON.parse(e.target.value));
                  } catch(err) {
                    // ignore parse errors while typing, allow user to finish
                  }
                }}
                onBlur={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setEditingItem(parsed);
                    setEditorText(JSON.stringify(parsed, null, 2));
                  } catch(err) {
                    showToast("❌ Invalid JSON format");
                  }
                }}
              />
            </div>
          </div>
        ) : (
          <div className="max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 font-serif capitalize">Manage {activeTab}</h1>
                <p className="text-slate-500 mt-2">Manage and update your website's {activeTab}.</p>
              </div>
              {activeTab !== 'site' && (
                <button
                  onClick={handleAddNew}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2"
                >
                  <span>+ Add New {activeTab.slice(0, -1)}</span>
                </button>
              )}
            </div>

            {/* Render Lists */}
            {data && activeTab === 'site' && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 w-full max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {Object.keys(data.SITE).map(key => {
                    const value = data.SITE[key];
                    if (typeof value === 'object') return null;
                    return (
                      <div key={key}>
                         <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">
                          {key}
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl px-4 py-2.5 text-slate-700 font-medium transition-all"
                          value={value || ''}
                          onChange={(e) => {
                            setData({
                              ...data, 
                              SITE: { ...data.SITE, [key]: e.target.value }
                            });
                          }}
                        />
                      </div>
                    )
                  })}
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <p className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4">Advanced Config</p>
                  <textarea
                    className="w-full h-48 p-5 bg-slate-900 text-emerald-400 font-mono text-xs rounded-2xl shadow-inner focus:outline-none"
                    value={editorText || JSON.stringify(data.SITE, null, 2)}
                    onChange={(e) => {
                      setEditorText(e.target.value);
                    }}
                    onBlur={(e) => {
                      try {
                        setData({...data, SITE: JSON.parse(e.target.value)});
                        setEditorText("");
                      } catch(err) {
                        showToast("❌ Invalid JSON format");
                      }
                    }}
                  />
                </div>
                
                <button onClick={() => handleSave(data)} disabled={saving} className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-xl font-bold tracking-wide shadow-lg shadow-emerald-500/20 w-full transition-all">
                  {saving ? 'Saving...' : 'Save Site Settings'}
                </button>
              </div>
            )}

            {data && ['tours', 'blogs', 'banners'].includes(activeTab) && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data[activeTab.toUpperCase()]?.map(item => (
                  <div key={item._id || item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all group flex flex-col">
                    <div className="h-48 bg-slate-100 relative overflow-hidden">
                      <img src={item.img || item.url || item.coverImage || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Preview"/>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                        {item.price ? `₹${item.price}` : (item.tag || item.category || 'Item')}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-sm mb-6 line-clamp-2">
                        {item.location || item.excerpt || item.sub || item.slug}
                      </p>
                      <div className="mt-auto flex gap-2">
                        <button 
                          onClick={() => { setEditingItem(item); setEditorText(JSON.stringify(item, null, 2)); }}
                          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-xl text-sm font-bold transition-colors"
                        >
                          Edit Details
                        </button>
                        <button 
                          onClick={() => handleDelete(item._id || item.id)}
                          className="px-4 bg-red-50 hover:bg-red-500 hover:text-white text-red-500 py-2 rounded-xl text-sm font-bold transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

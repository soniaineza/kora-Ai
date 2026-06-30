import { useState, useEffect } from 'react';
import {
  Store, Palette, Shield, Bell, CreditCard, Puzzle, Users,
  Check, Plus, Trash2, Smartphone, Layout, RefreshCw,
} from 'lucide-react';
import { useToast } from '../hooks/useToast';
import { useAuth } from '../context/AuthContext';

const tabs = [
  { id: 'profile', name: 'Business Profile', icon: Store },
  { id: 'branding', name: 'Branding', icon: Palette },
  { id: 'users', name: 'Users & Permissions', icon: Users },
  { id: 'subscription', name: 'Subscription', icon: CreditCard },
  { id: 'integrations', name: 'Integrations', icon: Puzzle },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'security', name: 'Security', icon: Shield },
];

const brandColors = ['#111111', '#D4AF37', '#EF4444', '#8B5CF6', '#3B82F6', '#10B981'];

const teamMembers = [
  { name: 'Alice Mutesi', email: 'alice@sunnycafe.com', role: 'Admin', avatar: 'AM' },
  { name: 'Bob Habimana', email: 'bob@sunnycafe.com', role: 'Editor', avatar: 'BH' },
  { name: 'Celine Uwimana', email: 'celine@sunnycafe.com', role: 'Viewer', avatar: 'CU' },
];

const integrationsList = [
  { name: 'WhatsApp Business', connected: true },
  { name: 'Instagram', connected: true },
  { name: 'Facebook Pages', connected: true },
  { name: 'MTN Mobile Money', connected: false },
  { name: 'Google Business Profile', connected: false },
  { name: 'Mailchimp Email', connected: false },
  { name: 'SMS Gateway', connected: false },
  { name: 'TikTok', connected: false },
];

export function Settings() {
  const { toast } = useToast();
  const { company, updateCompany } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedColor, setSelectedColor] = useState(company?.brandColor || brandColors[0]);
  const [profile, setProfile] = useState({
    name: company?.name || '',
    type: company?.type || '',
    phone: company?.phone || '',
    address: company?.address || '',
    website: company?.website || '',
    description: company?.description || '',
  });

  useEffect(() => {
    if (company) {
      setProfile({
        name: company.name,
        type: company.type,
        phone: company.phone,
        address: company.address,
        website: company.website,
        description: company.description,
      });
      setSelectedColor(company.brandColor);
    }
  }, [company]);

  const [integrations, setIntegrations] = useState(integrationsList);
  const [notifSettings, setNotifSettings] = useState({
    email: { newOrder: true, newLead: true, campaignReport: false, weeklyDigest: true, paymentReceipt: true },
    push: { newOrder: true, newLead: true, campaignReport: false, lowStock: true },
    sms: { newOrder: false, newLead: false, promoAlert: true },
  });
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Editor');

  function toggleIntegration(name: string) {
    setIntegrations(prev => prev.map(i => i.name === name ? { ...i, connected: !i.connected } : i));
  }

  function toggleNotif(channel: string, key: string) {
    setNotifSettings(prev => ({
      ...prev,
      [channel]: { ...prev[channel as keyof typeof prev], [key]: !prev[channel as keyof typeof prev][key as keyof typeof prev[keyof typeof prev]] },
    }));
  }

  const initials = company?.name
    ?.split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'K';

  return (
    <div className="pb-12">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-charcoal tracking-tight">Settings</h1>
        <p className="text-sm text-silver mt-0.5">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-56 shrink-0">
          <nav className="card-sm p-1.5 space-y-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-charcoal text-white'
                    : 'text-silver hover:bg-hover hover:text-charcoal'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 min-w-0">
          <div className="card p-6">

            {/* Business Profile */}
            {activeTab === 'profile' && (
              <div className="space-y-5">
                <h2 className="text-sm font-semibold text-charcoal">Business Profile</h2>
                <div className="flex items-center gap-4 pb-5 border-b border-border">
                  <div className="w-16 h-16 rounded-3xl bg-cream flex items-center justify-center text-silver text-lg font-bold">
                    {initials}
                  </div>
                  <div>
                    <button className="btn-secondary text-xs">Change Logo</button>
                    <p className="text-[10px] text-muted mt-1">JPG, GIF or PNG. Max 800K</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Business Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="label">Business Type</label>
                    <select
                      value={profile.type}
                      onChange={(e) => setProfile(p => ({ ...p, type: e.target.value }))}
                      className="input-field"
                    >
                      <option value="">Select type...</option>
                      <option>Cafe</option><option>Restaurant</option><option>Retail Shop</option>
                      <option>Salon & Spa</option><option>Bakery</option><option>Bar & Lounge</option>
                      <option>Hotel</option><option>Gym & Fitness</option><option>Service Business</option><option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Phone Number</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="label">Address</label>
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) => setProfile(p => ({ ...p, address: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="label">Description</label>
                    <textarea
                      value={profile.description}
                      onChange={(e) => setProfile(p => ({ ...p, description: e.target.value }))}
                      rows={2}
                      className="input-field resize-none"
                    />
                  </div>
                </div>
                <div className="pt-4 border-t border-border flex justify-end">
                  <button
                    onClick={() => {
                      updateCompany(profile);
                      toast('Business profile saved', 'success');
                    }}
                    className="btn-primary"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Branding */}
            {activeTab === 'branding' && (
              <div className="space-y-5">
                <h2 className="text-sm font-semibold text-charcoal">Branding</h2>

                <div className="flex items-center gap-4 pb-5 border-b border-border">
                  <div className="w-16 h-16 rounded-3xl bg-cream flex items-center justify-center text-silver text-lg font-bold">{initials}</div>
                  <div>
                    <button className="btn-secondary text-xs">Upload Logo</button>
                    <p className="text-[10px] text-muted mt-1">Recommended size: 512x512px</p>
                  </div>
                </div>

                <div>
                  <label className="label">Brand Color</label>
                  <div className="flex gap-2">
                    {brandColors.map(c => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
                          selectedColor === c ? 'ring-2 ring-offset-2 ring-charcoal scale-110' : ''
                        }`}
                        style={{ backgroundColor: c }}
                      >
                        {selectedColor === c && <Check className="w-4 h-4 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="label">Cover Photo</label>
                  <div className="w-full h-28 rounded-3xl bg-cream border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-silver transition-colors">
                    <span className="text-xs text-muted">Click to upload cover image</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex justify-end">
                  <button onClick={() => toast('Branding settings saved', 'success')} className="btn-primary">Save Branding</button>
                </div>
              </div>
            )}

            {/* Users & Permissions */}
            {activeTab === 'users' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-charcoal">Team Members</h2>
                  <button
                    onClick={() => setShowInviteForm(!showInviteForm)}
                    className="btn-primary text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Invite Member
                  </button>
                </div>

                {showInviteForm && (
                  <div className="bg-cream rounded-3xl p-4 space-y-3 border border-border">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="md:col-span-2">
                        <label className="label">Email Address</label>
                        <input type="email" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} placeholder="colleague@example.com" className="input-field" />
                      </div>
                      <div>
                        <label className="label">Role</label>
                        <select value={inviteRole} onChange={e => setInviteRole(e.target.value)} className="input-field">
                          <option>Admin</option><option>Editor</option><option>Viewer</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setShowInviteForm(false)} className="btn-secondary text-xs">Cancel</button>
                      <button onClick={() => { toast('Invitation sent to ' + inviteEmail, 'success'); setShowInviteForm(false); setInviteEmail(''); }} className="btn-primary text-xs">Send Invite</button>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {teamMembers.map(m => (
                    <div key={m.email} className="flex items-center justify-between p-3 rounded-2xl bg-cream">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-2xl bg-white border border-border text-charcoal flex items-center justify-center text-xs font-bold">{m.avatar}</div>
                        <div>
                          <p className="text-sm font-medium text-charcoal">{m.name}</p>
                          <p className="text-[11px] text-muted">{m.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`badge ${
                          m.role === 'Admin' ? 'bg-cream text-charcoal' :
                          m.role === 'Editor' ? 'bg-blue-50 text-blue-700' :
                          'bg-cream text-silver'
                        }`}>{m.role}</span>
                        <button className="text-muted hover:text-error transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Subscription */}
            {activeTab === 'subscription' && (
              <div className="space-y-5">
                <h2 className="text-sm font-semibold text-charcoal">Subscription</h2>

                <div className="bg-charcoal rounded-3xl p-5 text-white">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-muted">Current Plan</p>
                  <p className="text-lg font-bold mt-0.5">Business Plan</p>
                  <p className="text-sm text-silver">15,000 RWF / month</p>
                  <div className="mt-3 flex gap-2">
                    <span className="badge bg-white/10 text-white">Up to 5 team members</span>
                    <span className="badge bg-white/10 text-white">Unlimited campaigns</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-2xl bg-cream">
                    <p className="text-lg font-bold text-charcoal">3</p>
                    <p className="text-[10px] text-silver">Team Members</p>
                    <p className="text-[9px] text-muted">of 5 used</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-cream">
                    <p className="text-lg font-bold text-charcoal">12</p>
                    <p className="text-[10px] text-silver">Campaigns</p>
                    <p className="text-[9px] text-muted">unlimited</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-cream">
                    <p className="text-lg font-bold text-charcoal">2.4K</p>
                    <p className="text-[10px] text-silver">Contacts</p>
                    <p className="text-[9px] text-muted">of 10K used</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="label">Plan Options</p>
                  <div className="flex gap-2">
                    {['Free', 'Starter', 'Business', 'Premium'].map(plan => (
                      <button key={plan} className={`flex-1 py-2.5 rounded-2xl text-xs font-medium border transition-all ${
                        plan === 'Business'
                          ? 'bg-charcoal text-white border-charcoal'
                          : 'bg-white text-silver border-border hover:border-silver'
                      }`}>{plan}</button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex justify-end">
                  <button onClick={() => toast('Subscription plan updated', 'success')} className="btn-primary">Update Plan</button>
                </div>
              </div>
            )}

            {/* Integrations */}
            {activeTab === 'integrations' && (
              <div className="space-y-5">
                <h2 className="text-sm font-semibold text-charcoal">Connected Services</h2>
                <p className="text-xs text-silver -mt-3">Manage your third-party integrations.</p>
                <div className="space-y-1.5">
                  {integrations.map(integration => (
                    <div key={integration.name} className="flex items-center justify-between p-3 rounded-2xl bg-cream">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-bold ${
                          integration.connected ? 'bg-success/10 text-success' : 'bg-border text-muted'
                        }`}>
                          {integration.name.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-charcoal">{integration.name}</span>
                      </div>
                      <button
                        onClick={() => toggleIntegration(integration.name)}
                        className={`relative w-10 h-5 rounded-full transition-colors ${integration.connected ? 'bg-charcoal' : 'bg-border'}`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${integration.connected ? 'translate-x-5' : ''}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-5">
                <h2 className="text-sm font-semibold text-charcoal">Notification Preferences</h2>

                {[
                  { label: 'Email Notifications', key: 'email', items: [
                    { id: 'newOrder', label: 'New Orders' }, { id: 'newLead', label: 'New Leads' },
                    { id: 'campaignReport', label: 'Campaign Reports' }, { id: 'weeklyDigest', label: 'Weekly Digest' },
                    { id: 'paymentReceipt', label: 'Payment Receipts' },
                  ]},
                  { label: 'Push Notifications', key: 'push', items: [
                    { id: 'newOrder', label: 'New Orders' }, { id: 'newLead', label: 'New Leads' },
                    { id: 'campaignReport', label: 'Campaign Reports' }, { id: 'lowStock', label: 'Low Stock Alerts' },
                  ]},
                  { label: 'SMS Notifications', key: 'sms', items: [
                    { id: 'newOrder', label: 'New Orders' }, { id: 'newLead', label: 'New Leads' },
                    { id: 'promoAlert', label: 'Promotional Alerts' },
                  ]},
                ].map(section => (
                  <div key={section.key} className="space-y-2 pb-4 border-b border-border last:border-b-0">
                    <p className="text-xs font-medium text-charcoal">{section.label}</p>
                    {section.items.map(item => (
                      <div key={item.id} className="flex items-center justify-between py-1.5">
                        <span className="text-xs text-silver">{item.label}</span>
                        <button
                          onClick={() => toggleNotif(section.key, item.id)}
                          className={`relative w-9 h-4.5 rounded-full transition-colors ${notifSettings[section.key as keyof typeof notifSettings][item.id as keyof typeof notifSettings[keyof typeof notifSettings]] ? 'bg-charcoal' : 'bg-border'}`}
                        >
                          <span className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full shadow-sm transition-transform ${notifSettings[section.key as keyof typeof notifSettings][item.id as keyof typeof notifSettings[keyof typeof notifSettings]] ? 'translate-x-[18px] left-0.5' : 'left-0.5'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="space-y-5">
                <h2 className="text-sm font-semibold text-charcoal">Security</h2>

                <div className="space-y-3 pb-5 border-b border-border">
                  <p className="text-xs font-medium text-charcoal">Change Password</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="md:col-span-2">
                      <label className="label">Current Password</label>
                      <input type="password" className="input-field" />
                    </div>
                    <div>
                      <label className="label">New Password</label>
                      <input type="password" className="input-field" />
                    </div>
                    <div>
                      <label className="label">Confirm New Password</label>
                      <input type="password" className="input-field" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button onClick={() => toast('Password updated successfully', 'success')} className="btn-secondary text-xs flex items-center gap-1.5"><RefreshCw className="w-3 h-3" /> Update Password</button>
                  </div>
                </div>

                <div className="space-y-3 pb-5 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-charcoal">Two-Factor Authentication</p>
                      <p className="text-[10px] text-muted">Add an extra layer of security to your account.</p>
                    </div>
                    <button className="relative w-10 h-5 rounded-full bg-border transition-colors">
                      <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-medium text-charcoal">Active Sessions</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-cream">
                      <div className="flex items-center gap-3">
                        <Layout className="w-9 h-9 p-2 bg-charcoal/5 text-charcoal rounded-2xl" />
                        <div>
                          <p className="text-xs font-medium text-charcoal">Windows Chrome</p>
                          <p className="text-[10px] text-muted">Current session</p>
                        </div>
                      </div>
                      <span className="badge bg-success/10 text-success">Active now</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-cream">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-9 h-9 p-2 bg-border text-silver rounded-2xl" />
                        <div>
                          <p className="text-xs font-medium text-charcoal">iPhone 15 Safari</p>
                          <p className="text-[10px] text-muted">Kigali, Rwanda</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-muted">2 hours ago</span>
                    </div>
                  </div>
                  <button className="text-xs text-error hover:text-error/80 font-medium flex items-center gap-1"><Trash2 className="w-3 h-3" /> Sign out all other sessions</button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import {
  Store, Palette, Shield, Bell, CreditCard, Puzzle, Users,
  Check, Plus, Trash2, Smartphone, Layout, RefreshCw,
} from 'lucide-react';
import { useToast } from '../hooks/useToast';

const tabs = [
  { id: 'profile', name: 'Business Profile', icon: Store },
  { id: 'branding', name: 'Branding', icon: Palette },
  { id: 'users', name: 'Users & Permissions', icon: Users },
  { id: 'subscription', name: 'Subscription', icon: CreditCard },
  { id: 'integrations', name: 'Integrations', icon: Puzzle },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'security', name: 'Security', icon: Shield },
];

const brandColors = ['#f97316', '#ef4444', '#8b5cf6', '#3b82f6', '#10b981', '#000000'];

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
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedColor, setSelectedColor] = useState(brandColors[0]);
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

  return (
    <div className="pb-12">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-56 shrink-0">
          <nav className="space-y-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-kora-50 text-kora-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-card">

            {/* Business Profile */}
            {activeTab === 'profile' && (
              <div className="space-y-5">
                <h2 className="text-sm font-semibold text-gray-900">Business Profile</h2>
                <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-lg font-bold">SC</div>
                  <div>
                    <button className="px-3.5 py-1.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-xs">Change Logo</button>
                    <p className="text-[10px] text-gray-500 mt-1">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Business Name</label>
                    <input type="text" defaultValue="Sunny Cafe" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Business Type</label>
                    <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm text-gray-900">
                      <option>Cafe</option>
                      <option>Restaurant</option>
                      <option>Retail</option>
                      <option>Service</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" defaultValue="hello@sunnycafe.com" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm text-gray-900" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" defaultValue="+250 788 123 456" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm text-gray-900" />
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button onClick={() => toast('Business profile saved', 'success')} className="px-5 py-2 bg-kora-500 hover:bg-kora-600 text-white text-sm font-medium rounded-lg shadow-glow transition-colors">Save Changes</button>
                </div>
              </div>
            )}

            {/* Branding */}
            {activeTab === 'branding' && (
              <div className="space-y-5">
                <h2 className="text-sm font-semibold text-gray-900">Branding</h2>

                <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-lg font-bold">SC</div>
                  <div>
                    <button className="px-3.5 py-1.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-xs">Upload Logo</button>
                    <p className="text-[10px] text-gray-500 mt-1">Recommended size: 512x512px</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Brand Color</label>
                  <div className="flex gap-2">
                    {brandColors.map(c => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${selectedColor === c ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''}`}
                        style={{ backgroundColor: c }}
                      >
                        {selectedColor === c && <Check className="w-4 h-4 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Cover Photo</label>
                  <div className="w-full h-28 bg-gradient-to-r from-kora-100 to-kora-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200 cursor-pointer hover:border-kora-300 transition-colors">
                    <span className="text-xs text-gray-500">Click to upload cover image</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button onClick={() => toast('Branding settings saved', 'success')} className="px-5 py-2 bg-kora-500 hover:bg-kora-600 text-white text-sm font-medium rounded-lg shadow-glow transition-colors">Save Branding</button>
                </div>
              </div>
            )}

            {/* Users & Permissions */}
            {activeTab === 'users' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-gray-900">Team Members</h2>
                  <button
                    onClick={() => setShowInviteForm(!showInviteForm)}
                    className="px-3 py-1.5 bg-kora-500 hover:bg-kora-600 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Invite Member
                  </button>
                </div>

                {showInviteForm && (
                  <div className="bg-kora-50 rounded-xl p-4 space-y-3 border border-kora-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-medium text-gray-600 mb-1">Email Address</label>
                        <input type="email" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} placeholder="colleague@example.com" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm text-gray-900" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-medium text-gray-600 mb-1">Role</label>
                        <select value={inviteRole} onChange={e => setInviteRole(e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm text-gray-900">
                          <option>Admin</option>
                          <option>Editor</option>
                          <option>Viewer</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setShowInviteForm(false)} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                      <button onClick={() => { toast('Invitation sent to ' + inviteEmail, 'success'); setShowInviteForm(false); setInviteEmail(''); }} className="px-3 py-1.5 bg-kora-500 hover:bg-kora-600 text-white text-xs font-medium rounded-lg transition-colors">Send Invite</button>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {teamMembers.map(m => (
                    <div key={m.email} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-kora-100 text-kora-700 rounded-full flex items-center justify-center text-xs font-bold">{m.avatar}</div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{m.name}</p>
                          <p className="text-[11px] text-gray-500">{m.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                          m.role === 'Admin' ? 'bg-purple-100 text-purple-700' :
                          m.role === 'Editor' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>{m.role}</span>
                        <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Subscription */}
            {activeTab === 'subscription' && (
              <div className="space-y-5">
                <h2 className="text-sm font-semibold text-gray-900">Subscription</h2>

                <div className="bg-gradient-to-r from-kora-500 to-orange-500 rounded-xl p-4 text-white">
                  <p className="text-[10px] uppercase tracking-wide opacity-80">Current Plan</p>
                  <p className="text-lg font-bold mt-0.5">Business Plan</p>
                  <p className="text-sm opacity-90">15,000 RWF / month</p>
                  <div className="mt-3 flex gap-2">
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Up to 5 team members</span>
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Unlimited campaigns</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-lg font-bold text-gray-900">3</p>
                    <p className="text-[10px] text-gray-500">Team Members</p>
                    <p className="text-[9px] text-gray-400">of 5 used</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-lg font-bold text-gray-900">12</p>
                    <p className="text-[10px] text-gray-500">Campaigns</p>
                    <p className="text-[9px] text-gray-400">unlimited</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-lg font-bold text-gray-900">2.4K</p>
                    <p className="text-[10px] text-gray-500">Contacts</p>
                    <p className="text-[9px] text-gray-400">of 10K used</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-700">Plan Options</p>
                  <div className="flex gap-2">
                    {['Free', 'Starter', 'Business', 'Premium'].map(plan => (
                      <button key={plan} className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                        plan === 'Business'
                          ? 'bg-kora-500 text-white border-kora-500'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-kora-300'
                      }`}>{plan}</button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button onClick={() => toast('Subscription plan updated', 'success')} className="px-5 py-2 bg-kora-500 hover:bg-kora-600 text-white text-sm font-medium rounded-lg shadow-glow transition-colors">Update Plan</button>
                </div>
              </div>
            )}

            {/* Integrations */}
            {activeTab === 'integrations' && (
              <div className="space-y-5">
                <h2 className="text-sm font-semibold text-gray-900">Connected Services</h2>
                <p className="text-xs text-gray-500 -mt-3">Manage your third-party integrations.</p>
                <div className="space-y-1.5">
                  {integrations.map(integration => (
                    <div key={integration.name} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                          integration.connected ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'
                        }`}>
                          {integration.name.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{integration.name}</span>
                      </div>
                      <button
                        onClick={() => toggleIntegration(integration.name)}
                        className={`relative w-10 h-5 rounded-full transition-colors ${integration.connected ? 'bg-kora-500' : 'bg-gray-300'}`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${integration.connected ? 'translate-x-5' : ''}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-5">
                <h2 className="text-sm font-semibold text-gray-900">Notification Preferences</h2>

                {[
                  { label: 'Email Notifications', key: 'email', items: [
                    { id: 'newOrder', label: 'New Orders' },
                    { id: 'newLead', label: 'New Leads' },
                    { id: 'campaignReport', label: 'Campaign Reports' },
                    { id: 'weeklyDigest', label: 'Weekly Digest' },
                    { id: 'paymentReceipt', label: 'Payment Receipts' },
                  ]},
                  { label: 'Push Notifications', key: 'push', items: [
                    { id: 'newOrder', label: 'New Orders' },
                    { id: 'newLead', label: 'New Leads' },
                    { id: 'campaignReport', label: 'Campaign Reports' },
                    { id: 'lowStock', label: 'Low Stock Alerts' },
                  ]},
                  { label: 'SMS Notifications', key: 'sms', items: [
                    { id: 'newOrder', label: 'New Orders' },
                    { id: 'newLead', label: 'New Leads' },
                    { id: 'promoAlert', label: 'Promotional Alerts' },
                  ]},
                ].map(section => (
                  <div key={section.key} className="space-y-2 pb-4 border-b border-gray-100 last:border-b-0">
                    <p className="text-xs font-medium text-gray-700">{section.label}</p>
                    {section.items.map(item => (
                      <div key={item.id} className="flex items-center justify-between py-1.5">
                        <span className="text-xs text-gray-600">{item.label}</span>
                        <button
                          onClick={() => toggleNotif(section.key, item.id)}
                          className={`relative w-9 h-4.5 rounded-full transition-colors ${notifSettings[section.key as keyof typeof notifSettings][item.id as keyof typeof notifSettings[keyof typeof notifSettings]] ? 'bg-kora-500' : 'bg-gray-300'}`}
                        >
                          <span className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full shadow transition-transform ${notifSettings[section.key as keyof typeof notifSettings][item.id as keyof typeof notifSettings[keyof typeof notifSettings]] ? 'translate-x-[18px] left-0.5' : 'left-0.5'}`} />
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
                <h2 className="text-sm font-semibold text-gray-900">Security</h2>

                <div className="space-y-3 pb-4 border-b border-gray-100">
                  <p className="text-xs font-medium text-gray-700">Change Password</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-medium text-gray-600 mb-1">Current Password</label>
                      <input type="password" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-medium text-gray-600 mb-1">New Password</label>
                      <input type="password" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-medium text-gray-600 mb-1">Confirm New Password</label>
                      <input type="password" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button onClick={() => toast('Password updated successfully', 'success')} className="px-3.5 py-1.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-xs flex items-center gap-1.5"><RefreshCw className="w-3 h-3" /> Update Password</button>
                  </div>
                </div>

                <div className="space-y-3 pb-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-700">Two-Factor Authentication</p>
                      <p className="text-[10px] text-gray-500">Add an extra layer of security to your account.</p>
                    </div>
                    <button className="relative w-10 h-5 rounded-full bg-gray-300 transition-colors">
                      <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-medium text-gray-700">Active Sessions</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                      <div className="flex items-center gap-3">
                        <Layout className="w-8 h-8 p-1.5 bg-blue-100 text-blue-700 rounded-lg" />
                        <div>
                          <p className="text-xs font-medium text-gray-900">Windows Chrome</p>
                          <p className="text-[10px] text-gray-500">Current session</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-green-600 font-medium">Active now</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-8 h-8 p-1.5 bg-gray-100 text-gray-600 rounded-lg" />
                        <div>
                          <p className="text-xs font-medium text-gray-900">iPhone 15 Safari</p>
                          <p className="text-[10px] text-gray-500">Kigali, Rwanda</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400">2 hours ago</span>
                    </div>
                  </div>
                  <button className="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1"><Trash2 className="w-3 h-3" /> Sign out all other sessions</button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

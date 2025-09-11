"use client"

import { useState } from "react"
import {
  Users,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Upload,
  Download,
  QrCode,
  Lock,
  CheckCircle,
  AlertTriangle,
  X,
  Copy,
  Send,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock contacts data
const mockContacts = [
  {
    id: "1",
    name: "Alice Johnson",
    address: "0x742d35Cc6634C0532925a3b8D0C9964E2f4e2f",
    alias: "alice.eth",
    notes: "Regular trading partner, very trustworthy",
    tags: ["Trading", "DeFi"],
    trustLevel: "trusted",
    lastUsed: "2 days ago",
    transactionCount: 15,
    totalVolume: "$12,450",
  },
  {
    id: "2",
    name: "Bob Smith",
    address: "0x8f3a9b1c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a",
    alias: "",
    notes: "Friend from college, occasional crypto transfers",
    tags: ["Personal"],
    trustLevel: "trusted",
    lastUsed: "1 week ago",
    transactionCount: 8,
    totalVolume: "$3,200",
  },
  {
    id: "3",
    name: "Binance Hot Wallet",
    address: "0x1234567890abcdef1234567890abcdef12345678",
    alias: "",
    notes: "Main exchange wallet for trading",
    tags: ["Exchange", "Trading"],
    trustLevel: "unknown",
    lastUsed: "5 hours ago",
    transactionCount: 42,
    totalVolume: "$85,600",
  },
  {
    id: "4",
    name: "Suspicious Address",
    address: "0xdeadbeef1234567890abcdef1234567890abcdef",
    alias: "",
    notes: "Flagged by community, avoid transactions",
    tags: ["Flagged"],
    trustLevel: "blocked",
    lastUsed: "Never",
    transactionCount: 0,
    totalVolume: "$0",
  },
]

export default function AddressBookPage() {
  const [contacts, setContacts] = useState(mockContacts)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterLevel, setFilterLevel] = useState("all")
  const [selectedContact, setSelectedContact] = useState<any>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [newContact, setNewContact] = useState({
    name: "",
    address: "",
    alias: "",
    notes: "",
    tags: "",
    trustLevel: "unknown",
  })

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.alias.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter = filterLevel === "all" || contact.trustLevel === filterLevel

    return matchesSearch && matchesFilter
  })

  const getTrustBadge = (level: string) => {
    switch (level) {
      case "trusted":
        return (
          <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle className="h-3 w-3 mr-1" />
            Trusted
          </Badge>
        )
      case "blocked":
        return (
          <Badge variant="secondary" className="bg-red-500/10 text-red-500 border-red-500/20">
            <X className="h-3 w-3 mr-1" />
            Blocked
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Unknown
          </Badge>
        )
    }
  }

  const handleAddContact = () => {
    const contact = {
      id: Date.now().toString(),
      ...newContact,
      tags: newContact.tags.split(",").map((tag) => tag.trim()),
      lastUsed: "Never",
      transactionCount: 0,
      totalVolume: "$0",
    }
    setContacts([...contacts, contact])
    setNewContact({
      name: "",
      address: "",
      alias: "",
      notes: "",
      tags: "",
      trustLevel: "unknown",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditContact = () => {
    setContacts(
      contacts.map((contact) =>
        contact.id === selectedContact.id
          ? {
              ...selectedContact,
              tags: Array.isArray(selectedContact.tags)
                ? selectedContact.tags
                : selectedContact.tags.split(",").map((tag: string) => tag.trim()),
            }
          : contact,
      ),
    )
    setIsEditDialogOpen(false)
    setSelectedContact(null)
  }

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id))
  }

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    console.log("[v0] Address copied to clipboard:", address)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Address Book</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Contact
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Contact</DialogTitle>
                  <DialogDescription>Add a trusted contact to your encrypted address book.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Contact Name</Label>
                    <Input
                      id="name"
                      placeholder="Alice Johnson"
                      value={newContact.name}
                      onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Wallet Address</Label>
                    <div className="flex gap-2">
                      <Input
                        id="address"
                        placeholder="0x... or ENS name"
                        value={newContact.address}
                        onChange={(e) => setNewContact({ ...newContact, address: e.target.value })}
                        className="flex-1"
                      />
                      <Button variant="outline" size="icon">
                        <QrCode className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alias">Alias (Optional)</Label>
                    <Input
                      id="alias"
                      placeholder="alice.eth"
                      value={newContact.alias}
                      onChange={(e) => setNewContact({ ...newContact, alias: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trust-level">Trust Level</Label>
                    <Select
                      value={newContact.trustLevel}
                      onValueChange={(value) => setNewContact({ ...newContact, trustLevel: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trusted">Trusted</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                        <SelectItem value="blocked">Blocked</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      placeholder="Trading, DeFi, Personal"
                      value={newContact.tags}
                      onChange={(e) => setNewContact({ ...newContact, tags: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any notes about this contact..."
                      value={newContact.notes}
                      onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddContact} disabled={!newContact.name || !newContact.address}>
                    Add Contact
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search contacts by name, address, or alias..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterLevel} onValueChange={setFilterLevel}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Contacts</SelectItem>
                      <SelectItem value="trusted">Trusted Only</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Contacts List */}
            <div className="space-y-4">
              {filteredContacts.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-12">
                      <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No contacts found</h3>
                      <p className="text-muted-foreground mb-4">
                        {searchQuery || filterLevel !== "all"
                          ? "Try adjusting your search or filter criteria."
                          : "Start building your address book by adding trusted contacts."}
                      </p>
                      <Button onClick={() => setIsAddDialogOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                filteredContacts.map((contact) => (
                  <Card key={contact.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="text-sm font-bold">
                              {contact.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{contact.name}</h3>
                              {getTrustBadge(contact.trustLevel)}
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-mono text-muted-foreground">
                                  {contact.address.slice(0, 10)}...{contact.address.slice(-8)}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => copyAddress(contact.address)}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                              {contact.alias && <p className="text-sm text-primary font-medium">{contact.alias}</p>}
                              {contact.notes && (
                                <p className="text-sm text-muted-foreground line-clamp-2">{contact.notes}</p>
                              )}
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>Last used: {contact.lastUsed}</span>
                                <span>{contact.transactionCount} transactions</span>
                                <span>{contact.totalVolume} volume</span>
                              </div>
                              {contact.tags.length > 0 && (
                                <div className="flex gap-1 flex-wrap">
                                  {contact.tags.map((tag, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                            <Send className="h-4 w-4" />
                            Send
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedContact(contact)
                                  setIsEditDialogOpen(true)
                                }}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Contact
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => copyAddress(contact.address)}>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Address
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDeleteContact(contact.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Contact
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Address Book Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Contacts</span>
                  <span className="font-semibold">{contacts.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Trusted</span>
                  <span className="font-semibold text-green-500">
                    {contacts.filter((c) => c.trustLevel === "trusted").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Unknown</span>
                  <span className="font-semibold text-yellow-500">
                    {contacts.filter((c) => c.trustLevel === "unknown").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Blocked</span>
                  <span className="font-semibold text-red-500">
                    {contacts.filter((c) => c.trustLevel === "blocked").length}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Import/Export */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Import & Export</CardTitle>
                <CardDescription>Manage your address book data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  <Upload className="h-4 w-4" />
                  Import from CSV
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Export to CSV
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  <QrCode className="h-4 w-4" />
                  Scan QR Code
                </Button>
              </CardContent>
            </Card>

            {/* Privacy Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Encrypted Storage</p>
                      <p className="text-xs text-muted-foreground">
                        All contacts are encrypted and stored locally on your device
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">No Cloud Sync</p>
                      <p className="text-xs text-muted-foreground">
                        Your address book never leaves your device unless you export it
                      </p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Learn More About Privacy
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Contact Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Contact</DialogTitle>
            <DialogDescription>Update contact information and trust level.</DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Contact Name</Label>
                <Input
                  id="edit-name"
                  value={selectedContact.name}
                  onChange={(e) => setSelectedContact({ ...selectedContact, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-address">Wallet Address</Label>
                <Input
                  id="edit-address"
                  value={selectedContact.address}
                  onChange={(e) => setSelectedContact({ ...selectedContact, address: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-alias">Alias</Label>
                <Input
                  id="edit-alias"
                  value={selectedContact.alias}
                  onChange={(e) => setSelectedContact({ ...selectedContact, alias: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-trust-level">Trust Level</Label>
                <Select
                  value={selectedContact.trustLevel}
                  onValueChange={(value) => setSelectedContact({ ...selectedContact, trustLevel: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trusted">Trusted</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-tags">Tags</Label>
                <Input
                  id="edit-tags"
                  value={Array.isArray(selectedContact.tags) ? selectedContact.tags.join(", ") : selectedContact.tags}
                  onChange={(e) => setSelectedContact({ ...selectedContact, tags: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={selectedContact.notes}
                  onChange={(e) => setSelectedContact({ ...selectedContact, notes: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditContact}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

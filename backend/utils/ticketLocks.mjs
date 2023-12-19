class TicketLocks {
    constructor() {
        this.locks = new Map();
        this.io = null; // Initialize the io instance as null
    }

    setIo(io) {
        io.on('connection', (socket) => {
            console.log('A user connected (TicketLocks)');
            socket.on('lockTicket', (ticketId, userId) => {
                if (this.isTicketLocked(ticketId)) {
                    const lockedBy = this.getLockingUser(ticketId);
                    socket.emit('ticketAlreadyLocked', ticketId, lockedBy);
                } else {
                    // Grant the lock to the user
                    this.lockTicket(ticketId, userId);
                }
            });

            socket.on('unlockTicket', (ticketId) => {
                // Unlock the ticket
                this.unlockTicket(ticketId);
            });
        });
        this.io = io;
    }

    getIo() {
        return this.io;
    }

    lockTicket(ticketId, userId) {
        this.locks.set(ticketId, userId);
        if (this.io) {
            // Emit a message if io is set
            this.io.emit('ticketLocked', ticketId, userId);
        }
    }

    unlockTicket(ticketId) {
        this.locks.delete(ticketId);
        if (this.io) {
            // Emit a message if io is set
            this.io.emit('ticketUnlocked', ticketId);
        }
    }

    isTicketLocked(ticketId) {
        return this.locks.has(ticketId);
    }

    getLockingUser(ticketId) {
        return this.locks.get(ticketId);
    }
}

const ticketLocks = new TicketLocks();
export default ticketLocks;
